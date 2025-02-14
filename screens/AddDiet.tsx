import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ThemeContext } from "../ThemeContext";
import { Colors, Spacing } from "../constants/styles";

interface AddDietProps {
  onSave: () => void;
}

const AddDiet: React.FC<AddDietProps> = ({ onSave }) => {
  const [description, setDescription] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    // Validate
    if (
      description.trim() === "" ||
      calories.trim() === "" ||
      isNaN(Number(calories)) ||
      Number(calories) <= 0
    ) {
      Alert.alert("invalid input", "Please check your entries.");
      return;
    }

    const isImportant = Number(calories) > 800;

    try {
      await writeToDB("diets", {
        description: description,
        calories: calories,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });
      onSave();
    } catch (error) {
      Alert.alert("Error", "There was an error saving the diet entry.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    onSave();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
      testID="add-diet-view"
    >
      <Text style={[styles.header, { color: theme.text }]}>Add A Diet Entry</Text>
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      <Text>Calories:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text>Select Date:</Text>
      <TouchableOpacity onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          value={date.toDateString()}
          onFocus={toggleDatePicker}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="datetime-picker"
          value={date}
          mode="date"
          display="inline"
          onChange={onDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} color={Colors.primary} />
        <Button title="Cancel" onPress={handleCancel} color={Colors.secondary} />
      </View>
    </View>
  );
};

export default AddDiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
  },
  header: {
    fontSize: 24,
    marginBottom: Spacing.large,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.small,
    marginVertical: Spacing.small,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.large,
  },
});
