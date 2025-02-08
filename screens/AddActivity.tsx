import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";

import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { writeToDB } from "@/firebase/firestore";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

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
  const { BGColor, TXTColor } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [actValue, setActValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);
  const [date, setDate] = useState(new Date());
  const [date_text, setDateText] = useState("");
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState("");
  const onChangeDate = (e: DateTimePickerEvent, d: Date | undefined) => {
    setShow(false);
    if (d) {
      setDate(d);
      setDateText(d.toDateString());
      console.log(d.toDateString());
    }
  };

  function handleSave() {
    if (!actValue || !duration || !date_text) {
      Alert.alert(
        "Invalid Input",
        "Please check all inputs and ensure they are filled."
      );
      return;
    }

    const durationNumber = parseInt(duration, 10);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please check the duration input and ensure it is a positive number."
      );
      return;
    }

    const important =
      (actValue === "Running" || actValue === "Weights") && durationNumber > 60;

    const activityData = {
      activity: actValue,
      duration: duration,
      date: Timestamp.fromDate(date),
      important: important,
    };

    writeToDB("activities", activityData);

    onSave();
  }
  return (
    <View testID="add-activity-view" style={{ backgroundColor: BGColor }}>
      <Text testID="add-activity" style={{ color: TXTColor }}>
        Add Diet
      </Text>
      <View style={{ zIndex: 1000 }}>
        <Text>Activity</Text>
        <DropDownPicker
          testID="dropdown-picker"
          open={open}
          value={actValue}
          items={items}
          setOpen={setOpen}
          setValue={setActValue}
          setItems={setItems}
          placeholder="Select Activity"
        />

        <Text>Duration (min)</Text>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          placeholder="Enter duration"
          style={{ backgroundColor: "white" }}
        />
        <Text>Date</Text>
        <TextInput
          value={date_text}
          onPressIn={() => {
            setShow(true);
            setDate(new Date());
          }}
          placeholder="Select Date"
        />
        {show && (
          <DateTimePicker
            testID="datetime-picker"
            value={date}
            onChange={onChangeDate}
            timeZoneName={"US/Pacific"}
            display="inline"
          />
        )}
        <View>
          <Button title="SAVE" onPress={handleSave} />
          <Button title="Cancel" onPress={onSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
