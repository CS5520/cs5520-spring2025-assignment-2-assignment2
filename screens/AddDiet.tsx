
import { View, Text, StyleSheet, Alert, Button, TextInput,} from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { writeToDB } from "../firebase/firestore";
import { useTheme } from "../ThemeContext";
import { ThemeContext } from"../ThemeContext"
import { useContext } from "react";
import {styles} from "../constants/styles";


interface AddDietProps {
  onSave: () => void;
}


export default function AddDiet({onSave}: AddDietProps) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSave = async () => {
    if (!description || !calories || !date) {
      Alert.alert("Invalid Input", "Please check all fields.");
      return;
    }

    const parsedCalories = parseInt(calories, 10);
        if (isNaN(parsedCalories) || parsedCalories <= 0) {
            Alert.alert("Invalid Input", "Calories must be a positive number.");
            return;
        }

    const important = parsedCalories > 800;

    const newDiet = {
      description,
      calories,
      date: date ? Timestamp.fromDate(date) : null,
      important,
    };

    try {
      await writeToDB("diet", newDiet);
      setDescription("");
      setCalories("");
      setDate(new Date());
      onSave();

    } catch (error) {
      console.error("Failed to add diet entry:", error);
      Alert.alert("Error", "Failed to add diet entry. Please try again.");
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false); 
  };

  return (
    <View testID="add-diet-view" style={[styles.absolutePage, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="add-diet" style={[styles.title, { color: theme.textColor }]}>Add Diet</Text>
      <Text style={[styles.label, { color: theme.textColor }]}>Description *</Text>
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Calories *</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
        keyboardType="numeric"
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
        placeholder="Date"
        showSoftInputOnFocus={false}
      />
      {showDatePicker && (
        <DateTimePicker
          testID="datetime-picker"
          value={date}
          mode="date"
          display="inline" 
          onChange={handleDateChange}
        />
      )}
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress= {onSave} />

    </View>
  );
};

export default AddDiet;


