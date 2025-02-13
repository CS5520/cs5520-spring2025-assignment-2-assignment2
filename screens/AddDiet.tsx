import { View, Text, Alert, Button, TextInput, Platform, Pressable } from "react-native";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { writeToDB } from "../firebase/firestore";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { darkStyles, useTheme } from "../ThemeContext";
import { buttonColors } from "@/constants/colors";

export interface Diet {
  calories: string;
  description: string;
  date: Timestamp;
  important: boolean;
}

interface AddDietProps {
  onSave: () => void;
  onBack: () => void;
  onGoToSettings: () => void;
}

export default function AddDiet({ onSave, onBack, onGoToSettings }: AddDietProps) {
  const [calories, setCalories] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const { theme, styles=darkStyles } = useTheme();

  const toggleDatePicker = () => {
    setIsTouched(true); 
    setShow(!show);
  };

  const handleDatePicker = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate.toDateString()); 
    }
    setShow(false); 
  };

  const handleCancel = () => {
    setCalories("");
    setDescription("");
    setDate(new Date());
    onBack();
  };

  const handleSave = async () => {
    if (!calories || !description || isNaN(Number(calories)) || Number(calories) <= 0) {
      Alert.alert("Invalid Input", "Please enter valid values for all fields");
      return;
    }

    try {
      const dietData: Diet = {
        calories: calories,
        description: description,
        date: Timestamp.fromDate(date),
        important: Number(calories) > 800,
      };
      await writeToDB("diets", dietData);
      onSave();
    } catch (error) {
      Alert.alert("Error", "Failed to save diet");
    }
  };

  return (
    <View testID="add-diet-view" style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button title="Activities" disabled={true} color={buttonColors.disabled} />
          <Button title="Diets" disabled={true} color={buttonColors.disabled} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary} />
      </View>

      <View style={styles.buttomContainer}>
        <Text testID="add-diet" style={[styles.title,{color:theme.textColor}]}>
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
        value={isTouched ? (selectedDate || new Date().toDateString()) : "Select Date"}// Show "Select Date" when no date is selected
        onPressIn={toggleDatePicker}
        editable={false}
        placeholderTextColor={styles.placeholder.color}
      />

      {show && (
        <View style={styles.pickerContainer}>
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
          <Button title="Cancel" onPress={handleCancel} color={buttonColors.primary} />
          <Button title="Save" onPress={handleSave} color={buttonColors.primary} />
        </View>
      </View>
    </View>
  );
}
