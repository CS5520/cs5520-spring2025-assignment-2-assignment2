import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { styles } from "../constants/styles";
import { Activity, ActivityType } from "../constants/types";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface AddActivityProps {
  onSave: () => void;
}
export default function AddActivity({ onSave }: AddActivityProps) {
  const [duration, setDuration] = useState<string>("");

  const [activityValue, setActivityValue] = useState<ActivityType | null>(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ label: string; value: ActivityType }[]>(
    Object.values(ActivityType).map((type) => ({
      label: type,
      value: type,
    }))
  );

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
    console.log("save");
    if (!activityValue || !duration || !date) {
      Alert.alert("Invalid Input", "Please check your entries.");
      return;
    }
    const durationNumber = parseFloat(duration);
    if (isNaN(durationNumber) || durationNumber < 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number.");
      return;
    }

    const isImportant =
      (activityValue === ActivityType.Running ||
        activityValue === ActivityType.Weights) &&
      durationNumber > 60;

    const activityData = {
      activity: activityValue,
      duration: durationNumber,
      date: Timestamp.fromDate(date!),
      important: isImportant,
    };

    writeToDB("activities", activityData as Activity)
      .then(() => {
        console.log("Activity saved successfully");
        onSave(); // Call onSave prop to go back
      })
      .catch((error) => {
        console.error("Error saving activity: ", error);
        Alert.alert("Error", "Failed to save activity. Please try again.");
      });

    onSave();
  };

  return (
    <View testID="add-activity-view" style={styles.content}>
      <Text testID="add-activity" style={styles.title}>
        Add Activity
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Activity *</Text>
        <DropDownPicker
          open={open}
          value={activityValue}
          items={items}
          setOpen={setOpen}
          setValue={setActivityValue}
          setItems={setItems}
          style={styles.input}
          testID="dropdown-picker"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Duration (min)*</Text>
        <TextInput
          style={styles.input}
          placeholder="Duration"
          onChangeText={setDuration}
        />
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
