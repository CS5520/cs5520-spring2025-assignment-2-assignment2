import { View, Text, StyleSheet, Alert, Button, TextInput, TouchableOpacity, Platform } from "react-native";
import React, { useState, useContext } from "react";
import { Timestamp } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { writeToDB } from "../firebase/firestore";
import colours from "@/constants/styles";
import { ThemeContext } from "@/ThemeContext";

export interface Activity {
  duration: string;
  activity: string;
  date: Timestamp;
  important: boolean;
}
interface AddActivityProps {
  onSave: () => void;
}
export default function AddActivity({ onSave }: AddActivityProps) {
  const [activity, setActivity] = useState<string | null>(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {theme} = useContext(ThemeContext);
  

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
    
    const isImportant = (activity === "Running" || activity === "Weights") && Number(duration) > 60;

    let newActivity: Activity = {
      activity,
      duration,
      date: Timestamp.fromDate(date),
      important: isImportant,
    };
    writeToDB("activities", newActivity);
    onSave();
  }

  return (
    <View testID="add-activity-view" style={styles.container}>
      <Text testID="add-activity" style={[styles.title, {color: theme.textColor}]}>Add Activity</Text>

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
