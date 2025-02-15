import { View, Text, StyleSheet, Button, Alert } from "react-native";
import  { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { writeToDB } from "@/firebase/firestore";
import Input from "@/components/Input"; 
import DatePicker from "@/components/DatePicker";
import { useContext } from "react";
import { ThemeContext } from "@/ThemeContext";
import {
  color,
  commonTitleStyles, 
  commonButtonContainerStyles,
  commonTextStyles,
} from "@/constants/styles";
 
import { Timestamp } from "firebase/firestore";

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
  const { theme } = useContext(ThemeContext);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
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

  // Validate inputs
  const validateInputs = (): boolean => {
    if (!activity || !duration || !date) {
      Alert.alert("Invalid Input", "Please check and fill in all required fields and try again.");
      return false;
    }
    if (isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number. Please Check");
      return false;
    }
    return true;
  };
 
  function handleSave() {
    if (!validateInputs()) {
      return;
    }

    const important = (activity === "Running" || activity === "Weights")
                       && Number(duration) > 60;
    
    const newActivity: Activity = {
      activity: activity,
      duration: duration,
      date: Timestamp.fromDate(date as Date),
      important: important,
    };
    writeToDB("activities", newActivity);
    onSave();
  }

  return (
    <View 
      testID="add-activity-view" 
      style={[styles.container, { backgroundColor: theme.backgroundColor }]} 
    >
      <Text 
        testID="add-activity" 
        style={[commonTitleStyles.title, styles.title, { color: theme.textColor }]}>
      Add Activity
      </Text>
      <View style={styles.pickerContainer}>
        <Text 
          style={[commonTextStyles.text, { color: theme.textColor }]}>
        Activity*
        </Text> 
        <DropDownPicker
          open={open}
          value={activity}
          items={items}
          setOpen={setOpen}
          setValue={setActivity}
          setItems={setItems}
          placeholder="Select Activity"
          testID="dropdown-picker"
          style={[styles.picker, 
            { backgroundColor: theme.backgroundColor === color.tertiaryColor ?
            color.white : color.primaryColor }]}
          containerStyle={styles.pickerContainerStyle}
        />
      </View>
      
      <View>
        <Input 
          label="Duration(min)*"
          placeholder="Enter duration"
          value={duration}
          onChangeText={setDuration}
        />
      </View>
      
      <DatePicker
        date={date}
        onDateChange={setDate}
      />
      
      <View style={[commonButtonContainerStyles.buttonContainer,styles.buttonContainer]}>
        <Button title="Cancel" onPress={onSave} />
        <Button title="Save" onPress={handleSave} />
      </View>    
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primaryColor,
    flex: 1,
  },
  title: {
    marginBottom: 40,
  },
  picker: {
    backgroundColor: color.primaryColor,
  },
  pickerContainer: {
    marginLeft: 10,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginTop: 40,
  },
  pickerContainerStyle: {
    width: '95%',
  }
});

