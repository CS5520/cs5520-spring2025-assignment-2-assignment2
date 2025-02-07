import { View, Text, StyleSheet, Alert, Button, TextInput, Platform, TouchableOpacity } from "react-native";
import { Timestamp } from "firebase/firestore";
import React, { useState, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { writeToDB } from "@/firebase/firestore";
import colours from "@/constants/styles";
import { ThemeContext } from "@/ThemeContext";

export interface Diet {
  calories: string;
  description: string;
  date: Timestamp;
  important: boolean;
}
interface AddDietProps {
  onSave: () => void;
}
export default function AddDiet({ onSave }: AddDietProps) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {theme} = useContext(ThemeContext);
  
  
  function toggleDatePicker() {
    if (Platform.OS === "ios") {
      setShowDatePicker((prev) => !prev);
    } else {
      setShowDatePicker(true);
    }
  }
  
  function handleSave() {
    if (!description || !calories || !date || 
        isNaN(Number(calories)) || Number(calories) <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please check your input values");
      return;
    } 
    
    const isImportant = Number(calories) > 800;

    let newDiet: Diet = {
      description,
      calories,
      date: Timestamp.fromDate(date),
      important: isImportant,
    };
    writeToDB("diets", newDiet);
    onSave();
  }
  

  return (
    <View testID="add-diet-view" style={styles.container}>
      <Text testID="add-diet" style={[styles.title, {color: theme.textColor}]}>Add Diet</Text>

      {/* Description Input */}
      <Text style={[styles.label, {color: theme.textColor}]}>Description *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter description"
        onChangeText={setDescription}
        value={description}
      />

      {/* Calories Input */}
      <Text style={[styles.label,  {color: theme.textColor}]}>Calories *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter calories"
        onChangeText={setCalories}
        value={calories}
      />
      
      {/* Date Picker */}
      <Text style={[styles.label, {color: theme.textColor}]}>Date *</Text>
      <TouchableOpacity onPress={toggleDatePicker}>
        <TextInput
          style={styles.textInput}
          placeholder="Select Date"
          value={date? date.toDateString() : ""}
          // onPressIn={() => toggleDatePicker()}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="datetime-picker"
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
            if (Platform.OS !== "ios") {
              setShowDatePicker(false);
            }
          }}
        />
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Cancel" onPress={onSave} />
        <Button title="Save" onPress={handleSave}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colours.darkBackground,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
    height: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

});
