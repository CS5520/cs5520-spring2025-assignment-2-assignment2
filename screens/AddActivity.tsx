import { View, Text, StyleSheet, Alert, Button, TextInput, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ActivityType } from "../components/ItemTypes";
import { useTheme } from "../components/ThemeSwitch";
import { buttonColors } from "@/constants/colors";
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
  const [inputDateValue, setInputDateValue] = useState<string>("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { styles } = useTheme(); 

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "Walking", value: "walking" },
    { label: "Running", value: "running" },
    { label: "Swimming", value: "swimming" },
    { label: "Weights", value: "weights" },
    { label: "Yoga", value: "yoga" },
    { label: "Cycling", value: "cycling" },
    { label: "Hiking", value: "hiking" },
  ]);


  const toggleDatePicker = () => {
    setShow(!show);
  };

  const handleDatePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios"); 
    if (selectedDate) {
      setDate(selectedDate);
      setInputDateValue(selectedDate.toLocaleDateString());
    }
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
    console.log("Activity:", value);
    console.log("Date:", date);

    if (!duration || !activity || !date || isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert("Invalid Input", "Please enter valid values for all fields");
      return;
    }

    const isImportant = Number(duration) > 60 && (activity === "running" || activity === "weights");

    try {
      const activityData: Activity = {
        duration: duration,
        activity: activity as ActivityType,
        date: Timestamp.fromDate(date),
        important: isImportant,
      };

      await writeToDB("activity", activityData);
      onSave();
    } catch (error) {
      Alert.alert("Error", "Failed to save activity");
    }
  };

  return (
    <View style={styles.container} testID="add-activity-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
          <Button title="Diets" disabled={true} color={buttonColors.disabled}/>
          <Button title="Activities" disabled={true} color={buttonColors.disabled} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>

      <View style={styles.buttomContainer}>
      <Text style={styles.title} testID="add-activity">Add Activities</Text>
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
        style={styles.input}
        placeholder="Select Date"
        value={inputDateValue}
        onFocus={toggleDatePicker}
        testID="datetime-picker"
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
      <Button title="Cancel" onPress={handleCancel} color={buttonColors.primary}/>
      <Button title="Save" onPress={handleSave} color={buttonColors.primary}/>
      </View>
      </View>
    </View>
  );
}
