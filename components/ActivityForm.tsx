import { View, Text, StyleSheet, Alert, Button, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import colours from "@/constants/styles";
import { ThemeContext } from "@/ThemeContext";
import { router, useNavigation } from "expo-router";
import { ItemFromDB } from "./ItemsList";
import { updateDB, writeToDB } from "@/firebase/firestore";
import Checkbox from "expo-checkbox";

export interface ActivityFormProps {
  initialData?: ItemFromDB;
  editSaveHandler?: (id: string, newActivity: Activity) => void;
  addSaveHandler?: (newActivity: Activity) => void;
}

export interface Activity {
  duration: string;
  activity: string;
  date: Timestamp;
  important: boolean;
}

export default function ActivityForm({initialData, editSaveHandler, addSaveHandler}: ActivityFormProps) {
  const [activity, setActivity] = useState<string | null>(initialData?.title || null);
  const [duration, setDuration] = useState(initialData?.value || "");
  const [date, setDate] = useState<Date | null>(initialData?.date.toDate() || null);
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {theme} = useContext(ThemeContext);
  const [isChecked, setChecked] = useState(false);


  const activities = [
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ];

  function toggleDatePicker() {
    setDate(date || new Date());
    if (Platform.OS === "ios") {
      setShowDatePicker((prev) => !prev);
    } else {
      console.log("showing date picker");
      setShowDatePicker(true);
    }
  }

  function handleSave() {
    if (!activity || !duration || !date || 
        isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please check your input values");
      return;
    } 
    
    let isImportant;
    if (isChecked) {
      isImportant = false;
    } else {
      isImportant = (activity === "Running" || activity === "Weights") && Number(duration) > 60;
    }
    
    let newActivity: Activity = {
      activity,
      duration,
      date: Timestamp.fromDate(date),
      important: isImportant,
    };
    
    if (initialData && editSaveHandler) {
      editSaveHandler(initialData.id, newActivity);
    } else if (addSaveHandler) {
      addSaveHandler(newActivity);
    }
  }
  


  return (
    <View testID="add-activity-view" style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {/* <Text testID="add-activity" style={[styles.title, {color: theme.textColor}]}>Add Activity</Text> */}

      {/* Activity Dropdown */}
      <Text style={[styles.label, {color: theme.textColor}]}>Activity *</Text>
      <DropDownPicker
        testID="dropdown-picker"
        open={open}
        value={activity}
        items={activities}
        setOpen={setOpen}
        setValue={setActivity}
        placeholder="Select Activity"
      />

      {/* Duration Input */}
      <Text style={[styles.label, {color: theme.textColor}]}>Duration (min) *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter duration"
        onChangeText={setDuration}
        value={duration}
      />

      {/* Date Picker */}
      <Text style={[styles.label, {color: theme.textColor}]}>Date *</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Select Date"
        value={date? date.toDateString() : ""}
        onPressIn={toggleDatePicker}
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
