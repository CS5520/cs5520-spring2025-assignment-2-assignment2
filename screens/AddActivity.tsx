import { View, Text, StyleSheet, Alert, Button, TextInput,} from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "../ThemeContext";
import { ThemeContext } from"../ThemeContext"
import { useContext } from "react";
import {styles} from "../constants/styles";


interface AddActivityProps {
  onSave: () => void;
}

export default function AddActivity({ onSave }: AddActivityProps) {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
      { label: "Walking", value: "Walking" },
      { label: "Running", value: "Running" },
      { label: "Swimming", value: "Swimming" },
      { label: "Weights", value: "Weights" },
      { label: "Yoga", value: "Yoga" },
      { label: "Cycling", value: "Cycling" },
      { label: "Hiking", value: "Hiking" }
  ]);


  const handleSave = async () => {
      if (!activity || !duration || !date) {
        Alert.alert("Invalid Input", "Please check all fields.");
        return;
      }
      
      const parsedDuration = parseInt(duration, 10);
        if (isNaN(parsedDuration) || parsedDuration <= 0) {
          Alert.alert("Invalid Input", "Duration must be a positive number.");
          return;
      }

      const important = (activity === "Running" || activity === "Weights") && parsedDuration > 60;

      const newActivity = {
        activity,
        duration,
        date: date ? Timestamp.fromDate(date) : null,
        important,
      };
  
      try {
        await writeToDB("activities", newActivity);
        setActivity("");
        setDuration("");
        setDate(new Date());
        onSave();
  
      } catch (error) {
        console.error("Failed to add activity entry:", error);
        Alert.alert("Error", "Failed to add activity entry. Please try again.");
      }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
      if (selectedDate) {
        setDate(selectedDate);
      }
      setShowDatePicker(false); 
    };  

  // return (
  //   <View testID="add-activity-view">
  //     <Text testID="add-activity">Add Diet</Text>
  //   </View>
  // );


  return (
    <View testID="add-activity-view" style={[styles.absolutePage,{ backgroundColor: theme.backgroundColor }]} >
      <Text testID="add-activity" style={[styles.title, { color: theme.textColor }]}>Add Activity</Text>
      <Text style={[styles.label, { color: theme.textColor }]}>Activity *</Text>
      <DropDownPicker
                testID="dropdown-picker"
                open={open}
                value={activity}
                items={items}
                setOpen={setOpen}
                setValue={setActivity}
                setItems={setItems}
                style={styles.dropdown}
                placeholder="Select Activity"
                containerStyle={{ marginBottom: 10 }}
            />

      <Text style={[styles.label, { color: theme.textColor }]}>Duration *</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter Duration"
        keyboardType="numeric"
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date.toDateString()}
        onFocus={() => {setShowDatePicker(true)}}
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
}



