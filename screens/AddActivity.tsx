import { View, Text, StyleSheet, Alert, Button, TextInput, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ActivityType } from "../components/ItemTypes";
import { darkStyles, useTheme } from "../ThemeContext";

export interface Activity {
  duration: string;
  activity: ActivityType;
  date: Timestamp;
  important: boolean;
}

interface AddActivityProps {
  onSave: () => void;
  onBack: () => void;
  onGoToSettings: () => void;
}

export default function AddActivity({ onSave, onBack, onGoToSettings }: AddActivityProps) {
  const [duration, setDuration] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [important, setImportant] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const { theme, styles = darkStyles } = useTheme();

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

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const toggleDatePicker = () => {
    setIsTouched(true); // Mark as touched when user clicks on the input
    setShow(!show);
  };

  const handleDatePicker = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate.toDateString()); // Set selected date as string
    }
    setShow(false); // Close date picker after selection
  };

  const handleCancel = () => {
    setDuration("");
    setActivity("");
    setDate(new Date());
    setImportant(false);
    onBack();
  };

  const handleSave = async () => {
    console.log("Duration:", duration);
    console.log("Activity:", activity);
    console.log("Date:", date);

    if (!duration || !activity || !date || isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert("Invalid", "Please check your inputs");
      return;
    }

    try {
      const activityData: Activity = {
        duration: duration,
        activity: activity as ActivityType,
        date: Timestamp.fromDate(date),
        important: Number(duration) > 60 && (activity === "Running" || activity === "Weights"),
      };

      await writeToDB("activities", activityData);
      onSave();
    } catch (error) {
      Alert.alert("Error", "Failed to save activity");
    }
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]} testID="add-activity-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button title="Activities" disabled={true} />
          <Button title="Diets" disabled={true} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} />
      </View>

      <View style={styles.buttomContainer}>
      <Text style={[styles.title,{color:theme.textColor}]}testID="add-activity">Add Activities</Text>
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
      <Button title="Cancel" onPress={handleCancel} />
      <Button title="Save" onPress={handleSave} />
      </View>
      </View>
    </View>
  );
}
