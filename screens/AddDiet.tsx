import { View, Text, Alert, Button, TextInput, Platform, Pressable } from "react-native"; // Import necessary components from React Native
import { Timestamp } from "firebase/firestore"; // Import Timestamp from Firebase to handle date format
import { useState } from "react"; // Import useState hook to manage state in the component
import { writeToDB } from "../firebase/firestore"; // Import function to write data to Firestore
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"; // Import DateTimePicker for date selection
import { useTheme } from "../ThemeContext"; // Import theme context and styles
import { darkStyles } from "@/constants/styles";
import { buttonColors } from "@/constants/colors"; // Import button color constants

// Interface for the Diet object to define its structure
export interface Diet {
  calories: string; // Calories input field
  description: string; // Description input field
  date: Timestamp; // Date of the diet entry
  important: boolean; // Flag to mark the diet as important based on calories
}

// Props for the AddDiet component
interface AddDietProps {
  onSave: () => void; // Function to handle saving the diet data
  onBack: () => void; // Function to navigate back
  onGoToSettings: () => void; // Function to navigate to settings
}

export default function AddDiet({ onSave, onBack, onGoToSettings }: AddDietProps) {
  // State variables to manage user inputs and other component states
  const [calories, setCalories] = useState<string>(""); // Calories input field state
  const [description, setDescription] = useState<string>(""); // Description input field state
  const [date, setDate] = useState<Date>(new Date()); // State for holding selected date
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for displaying selected date
  const [isTouched, setIsTouched] = useState(false); // Flag to track if the date input is touched
  const [show, setShow] = useState<boolean>(false); // Flag to show or hide the date picker
  const { theme, styles = darkStyles } = useTheme(); // Access theme and styles from context

  // Function to toggle the visibility of the date picker
  const toggleDatePicker = () => {
    setIsTouched(true); // Mark the input as touched
    setShow(!show); // Toggle the visibility of the date picker
  };

  // Function to handle date selection from the picker
  const handleDatePicker = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate); // Set the selected date
      setSelectedDate(selectedDate.toDateString()); // Convert date to string for display
    }
    setShow(false); // Hide the date picker after selecting a date
  };

  // Function to reset input fields and go back
  const handleCancel = () => {
    setCalories(""); // Reset calories input field
    setDescription(""); // Reset description input field
    setDate(new Date()); // Reset date field to current date
    onBack(); // Trigger the onBack function
  };

  // Function to save the entered diet data to Firestore
  const handleSave = async () => {
    // Validate input fields
    if (!calories || !description || isNaN(Number(calories)) || Number(calories) <= 0) {
      Alert.alert("Invalid Input", "Please enter valid values for all fields");
      return;
    }

    try {
      // Prepare diet data to save in Firestore
      const dietData: Diet = {
        calories: calories,
        description: description,
        date: Timestamp.fromDate(date), // Convert JavaScript Date to Firestore Timestamp
        important: Number(calories) > 800, // Mark as important if calories > 800
      };
      await writeToDB("diets", dietData); // Write data to Firestore collection "diets"
      onSave(); // Trigger onSave function after successfully saving
    } catch (error) {
      // Handle errors during the saving process
      Alert.alert("Error", "Failed to save diet");
    }
  };

  return (
    <View testID="add-diet-view" style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.switchButton}>
          <Button title="Activities" disabled={true} color={buttonColors.disabled} />
          <Button title="Diets" disabled={true} color={buttonColors.disabled} />
        </View>

        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary} />
      </View>


      <View style={styles.buttomContainer}>
        <Text testID="add-diet" style={[styles.title, { color: theme.textColor }]}>
          Add Diet
        </Text>

        <Text style={styles.text}>Description *</Text>
        <TextInput
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          style={styles.dietInput}
        />

        <Text style={styles.text}>Calories *</Text>
        <TextInput
          placeholder="Enter calories"
          value={calories}
          onChangeText={setCalories}
          style={styles.input}
        />

        <Text style={styles.text}>Date *</Text>
        <TextInput
          testID="datepicker-text-input"
          style={styles.input}
          placeholder="Select Date"
          value={isTouched ? (selectedDate || new Date().toDateString()) : "Select Date"} // Display selected date or placeholder
          onPressIn={toggleDatePicker} // Show date picker on press
          editable={false} // Make the input non-editable, only the picker is used
          placeholderTextColor={styles.placeholder.color}
        />

        {show && (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              testID="datetime-picker"
              value={date}
              mode="date" // Date mode only (no time)
              display="inline" // Inline display within the screen
              onChange={handleDatePicker} // Handle date selection
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} color={buttonColors.primary} />
          <Button title="Save" onPress={handleSave} color={buttonColors.primary} />
        </View>
      </View>
    </View>
  );
}
