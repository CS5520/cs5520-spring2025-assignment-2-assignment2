import { View, Text, Alert, Button, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ActivityType } from "../components/ItemTypes";
import { useTheme } from "../ThemeContext";
import { darkStyles } from "@/constants/styles";

export interface Activity {
  duration: string;
  activity: ActivityType;
  date: Timestamp;
  important: boolean;
}

interface AddActivityProps {
  onSave: () => void; // Function to call when save is successful
  onBack: () => void; // Function to call when user cancels
  onGoToSettings: () => void; // Function to navigate to settings
}

export default function AddActivity({ onSave, onBack, onGoToSettings }: AddActivityProps) {
  // Declare state variables to store user input and control component behavior
  const [duration, setDuration] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [important, setImportant] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const { theme, styles = darkStyles } = useTheme(); // Custom theme and styles

  // Dropdown state for activity selection
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

  // Handle changes in the date picker
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date; // Fallback to the current date if none is selected
    setShowPicker(false);
    setDate(currentDate);
  };

  // Toggle visibility of the date picker
  const toggleDatePicker = () => {
    setIsTouched(true); // Mark as touched when user clicks on the input
    setShow(!show);
  };

  // Handle date selection from the date picker
  const handleDatePicker = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate.toDateString()); // Convert date to string for display
    }
    setShow(false); // Close date picker after selection
  };

  // Reset the form and call the onBack function
  const handleCancel = () => {
    setDuration("");
    setActivity("");
    setDate(new Date());
    setImportant(false);
    onBack(); // Navigate back
  };

  // Validate input and save the activity
  const handleSave = async () => {
    // Log inputs to the console for debugging
    console.log("Duration:", duration);
    console.log("Activity:", activity);
    console.log("Date:", date);

    // Validate the inputs before saving
    if (!duration || !activity || !date || isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert("Invalid", "Please check your inputs"); // Show alert if inputs are invalid
      return;
    }

    try {
      // Create the activity object to save
      const activityData: Activity = {
        duration: duration,
        activity: activity as ActivityType, // Cast to ActivityType
        date: Timestamp.fromDate(date), // Convert date to Firestore Timestamp
        important: Number(duration) > 60 && (activity === "Running" || activity === "Weights"), // Mark as important based on conditions
      };

      // Save activity to Firestore database
      await writeToDB("activities", activityData);
      onSave(); // Call onSave function if successful
    } catch (error) {
      Alert.alert("Error", "Failed to save activity"); // Show error alert if save fails
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} testID="add-activity-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
          <Button title="Activities" disabled={true} />
          <Button title="Diets" disabled={true} />
        </View>
        <View style={styles.button}>
        <Button title="Settings" onPress={onGoToSettings} />
        </View>
      </View>

      <View style={styles.buttomContainer}>
        <Text style={[styles.title, { color: theme.textColor }]} testID="add-activity">Add Activities</Text>

        <Text style={styles.text}>Activity *</Text>
        <DropDownPicker
          testID="dropdown-picker"
          open={open}
          value={activity}
          items={items}
          setOpen={setOpen}
          setValue={setActivity}
          setItems={setItems}
          placeholder="Select Activity"
          style={styles.pickerContainer}
          dropDownContainerStyle={styles.picker}
          placeholderStyle={styles.placeholder}
          textStyle={styles.placeholder}
        />

        <Text style={styles.text}>Duration(min) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter duration"
          value={duration}
          onChangeText={setDuration}
          placeholderTextColor={styles.placeholder.color}
        />

        <Text style={styles.text}>Date *</Text>
        <TextInput
          testID="datepicker-text-input"
          style={styles.input}
          placeholder="Select Date"
          value={isTouched ? (selectedDate || new Date().toDateString()) : "Select Date"}
          onPressIn={toggleDatePicker}
          editable={false}
          placeholderTextColor={styles.placeholder.color}
        />

        {show && (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              testID="datetime-picker"
              value={date}
              mode="date"
              display="inline"
              onChange={handleDatePicker}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
}
