import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ThemeContext } from "../ThemeContext";
import { Colors, Spacing } from "../constants/styles";
import CustomButton from "@/CustomButtons";

interface AddActivityProps {
  onSave: () => void;
}

const AddActivity: React.FC<AddActivityProps> = ({ onSave }) => {
  const [activityType, setActivityType] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weight Training", value: "Weight Training" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

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
    if (
      !activityType ||
      duration.trim() === "" ||
      isNaN(Number(duration)) ||
      Number(duration) <= 0
    ) {
      Alert.alert("invalid input", "Please check your entries.");
      return;
    }

    const isImportant =
      (activityType === "Running" || activityType === "Weight Training") &&
      Number(duration) > 60;

    try {
      await writeToDB("activities", {
        activity: activityType,
        duration,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });
      onSave();
    } catch (error) {
      Alert.alert("Error", "There was an error saving the activity.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    onSave();
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        if (open) setOpen(false);
      }}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]} testID="add-activity-view">
        <Text style={[styles.header, { color: theme.text }]}>Add An Activity</Text>
        <Text style={[styles.label, { color: theme.text }]}>Select Activity Type:</Text>
        <View style={{ zIndex: 999 }}>
          <DropDownPicker
            testID="dropdown-picker"
            open={open}
            value={activityType}
            items={items}
            setOpen={setOpen}
            setValue={setActivityType}
            setItems={setItems}
            containerStyle={{ marginBottom: Spacing.medium }}
            listMode="SCROLLVIEW"
            dropDownContainerStyle={{
              maxHeight: 150,
            }}
          />
        </View>

        <Text style={[styles.label, { color: theme.text }]}>Duration (minutes):</Text>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Enter duration"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />

        <Text style={[styles.label, { color: theme.text }]}>Select Date:</Text>
        <TouchableOpacity onPress={toggleDatePicker}>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={date.toDateString()}
            onFocus={toggleDatePicker}
            placeholderTextColor="#888"
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
          {/* <Button title="Save" onPress={handleSave} color={Colors.primary} />
          <Button title="Cancel" onPress={handleCancel} color={Colors.secondary} /> */}
          <CustomButton
            label="Save"
            onPress={handleSave}
            backgroundColor={Colors.primary}
            textColor="#FFFFFF"
         />
         <CustomButton
           label="Cancel"
           onPress={handleCancel}
           backgroundColor={Colors.secondary}
           textColor="#000000"
         />
        </View>
      </View>
    </Pressable>
  );
};

export default AddActivity;

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
  label: {
    fontSize: 16,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.small,
    marginBottom: Spacing.medium,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.large,
  },
});
