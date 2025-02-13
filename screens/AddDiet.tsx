import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { Timestamp } from "firebase/firestore";
import { styles } from "../constants/styles";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { writeToDB } from "../firebase/firestore";
import { Diet } from "../constants/types";

interface AddDietProps {
  onSave: () => void;
}
export default function AddDiet({ onSave }: AddDietProps) {
  const [calories, setCalories] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [date, setDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };  

  const handleSave = () => {
    if (!calories || !description || !date) {
      Alert.alert("Invalid Input", "Please check your entries.");
      return;
    }
    const caloriesNumber = parseFloat(calories);
    if (isNaN(caloriesNumber) || caloriesNumber < 0) {
      Alert.alert("Invalid Input", "Calories must be a positive number.");
      return;
    }

    const isImportant = caloriesNumber > 800;

    const dietData = {
      calories: caloriesNumber,
      description: description,
      date: Timestamp.fromDate(date!),
      important: isImportant,
    };

    writeToDB("diets", dietData as Diet)
      .then(() => {
        console.log("Diet saved successfully");
        onSave(); // Call onSave prop to go back
      })
      .catch((error) => {
        console.error("Error saving diet: ", error);
        Alert.alert("Error", "Failed to save diet. Please try again.");
      });
  };

  return (
    <View testID="add-diet-view" style={styles.content}>
      <Text testID="add-diet" style={styles.title}>
        Add Diet
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Description *</Text>
        <TextInput
          style={[styles.input, { paddingBottom: 100 }]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Calories *</Text>
        <TextInput style={styles.input} placeholder="Enter calories" value={calories} onChangeText={setCalories} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={date ? date.toLocaleDateString() : ""}
          onPressIn={() => {
            setShowDatePicker((prev) => !prev);
          }}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="inline"
            onChange={handleDateChange}
            testID="datetime-picker"
          />
        )}
      </View>
      <View style={styles.adjacentButtonsContainer}>
        <Button title="Cancel" onPress={onSave} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}
