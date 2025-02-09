import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ActivityType } from "../components/ItemTypes";

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

  const activities = ["Running", "Cycling", "Swimming", "Walking", "Weightlifting"];  // Array of activities

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const handleDatePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
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
    if (!duration || !activity || !date || isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert("Invalid Input", "Please enter valid values for all fields");
      return;
    }

    const isImportant = Number(duration) > 60 && (activity === "Running" || activity === "Weightlifting");

    try {
      const activityData: Activity = {
        duration: duration,
        activity: activity as ActivityType,
        date: Timestamp.fromDate(date),
        important: isImportant,
      };

      await writeToDB("activities", activityData);

    } catch (error) {
      Alert.alert("Error", "Failed to save activity");
    }
  };

  return (
    <View style={styles.container} testID="add-activity-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
          <Button title="Diets" disabled={true} />
          <Button title="Activities" disabled={true} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} />
      </View>

      <View style={styles.buttomContainer}>
      <Text style={styles.title} testID="add-activity">Add Activities</Text>
      <Text style={styles.text}>Activity *</Text>
      <View style={styles.pickerContainer}>
        <Picker
        style={styles.picker}
        selectedValue={activity}
        onValueChange={(itemValue) => {
          console.log("Picker Changed:", itemValue);
          setActivity(itemValue);
        }}
      >
        <Picker.Item label="Select an Activity" value="" />
        {activities.map((activityItem, index) => (
          <Picker.Item label={activityItem} value={activityItem} key={index} />
        ))}
        </Picker>
      </View>

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
      <Button title="Cancel" onPress={handleCancel} />
      <Button title="Save" onPress={handleSave} />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'grey',
    paddingTop: 0,
    width: '100%',
  },
  switchButton: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttomContainer:{
    marginHorizontal:20
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 10,
  },
  placeholder: {
    color: 'white',
  },
  pickerContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  picker: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    color:'white'
  },
  buttonContainer:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: "space-evenly",
  }
});
