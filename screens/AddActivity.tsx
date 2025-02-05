import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";

import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);
  const [date, setDate] = useState(new Date(1598051));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  return (
    <View testID="add-activity-view">
      <Text testID="add-activity">Add Diet</Text>
      <View style={{ zIndex: 1000 }}>
        <Text>Activity</Text>
        <DropDownPicker
          testID="dropdown-picker"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <Text>Duration (min)</Text>
        <TextInput></TextInput>
        <Text>Date</Text>
        <TextInput></TextInput>
        <DateTimePicker value={date} />
        <View>
          <Button title="SAVE" onPress={onSave} />
          <Button title="Cancel" onPress={onSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
