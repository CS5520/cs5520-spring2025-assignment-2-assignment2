import { View, Text, StyleSheet, Alert, Button, TextInput, Platform, TouchableOpacity } from "react-native";
import { Timestamp } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { writeToDB } from "@/firebase/firestore";
import colours from "@/constants/styles";
import { ThemeContext } from "@/ThemeContext";
import { router, useNavigation } from "expo-router";
import PressableButton from "@/components/PressableButton";
import { Ionicons } from '@expo/vector-icons';
import { ItemFromDB } from "./ItemsList";
import Checkbox from "expo-checkbox";

export interface DietFormProps {
  initialData?: ItemFromDB;
  editSaveHandler?: (id: string, newDiet: Diet) => void;
  addSaveHandler?: (newDiet: Diet) => void;
  
}

export interface Diet {
  calories: string;
  description: string;
  date: Timestamp;
  important: boolean;
}


export default function DietForm({initialData, editSaveHandler, addSaveHandler}: DietFormProps) {
  const [description, setDescription] = useState(initialData?.title || "");
  const [calories, setCalories] = useState(initialData?.value || "");
  const [date, setDate] = useState<Date | null>(initialData?.date.toDate() || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {theme} = useContext(ThemeContext);
  const [isChecked, setChecked] = useState(false);
    
  function toggleDatePicker() {
    setDate(date || new Date());
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
    
    let isImportant;
    if (isChecked) {
      isImportant = false;
    } else {
      isImportant = Number(calories) > 800;
    }

    let newDiet: Diet = {
      description,
      calories,
      date: Timestamp.fromDate(date),
      important: isImportant,
    };
    if (initialData && editSaveHandler) {
      editSaveHandler(initialData.id, newDiet);
    } else if (addSaveHandler) {
      addSaveHandler(newDiet);
    }
  }
  

  return (
    <View testID="add-diet-view" style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {/* <Text testID="add-diet" style={[styles.title, {color: theme.textColor}]}>Add Diet</Text> */}

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
      <TextInput
        style={styles.textInput}
        placeholder="Select Date"
        value={date? date.toDateString() : ""}
        onPressIn={() => toggleDatePicker()}
        // editable={false}
      />

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

      {/* Checkbox */}
      {initialData && initialData.isImportant && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={{color: 'grey'}}>
            This item is marked as important. If you select the checkbox, the item will no longer be marked as important.
          </Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Cancel" onPress={()=> router.back()} />
        <Button title="Save" onPress={handleSave}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  checkbox: {
    marginRight: 10,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

});
