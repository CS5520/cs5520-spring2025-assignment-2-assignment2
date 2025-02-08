import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { writeToDB } from "@/firebase/firestore";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

export interface Diet {
  calories: string;
  description: string;
  date: Timestamp;
  important: boolean;
}
interface AddDietProps {
  onSave: () => void;
}
export default function AddDiet({ onSave }: AddDietProps) {
  const { BGColor, TXTColor } = useContext(ThemeContext);
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [date_text, setDateText] = useState("");
  const [show, setShow] = useState(false);
  const onChangeDate = (e: DateTimePickerEvent, d: Date | undefined) => {
    setShow(false);
    if (d) {
      setDate(d);
      setDateText(d.toDateString());
      console.log(d.toDateString());
    }
  };

  function handleSave() {
    if (!description || !calories || !date_text) {
      Alert.alert(
        "Invalid Input",
        "Please check all inputs and ensure they are filled."
      );
      return;
    }

    const caloriesNumber = parseInt(calories, 10);
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please check the calories input and ensure it is a positive number."
      );
      return;
    }

    const important = caloriesNumber > 800;

    const dietData: Diet = {
      calories: calories,
      description: description,
      date: Timestamp.fromDate(date),
      important: important,
    };
    writeToDB("diet", dietData);

    onSave();
  }

  return (
    <View testID="add-diet-view" style={{ backgroundColor: BGColor }}>
      <Text testID="add-diet" style={{ color: TXTColor }}>
        Add Diet
      </Text>
      <Text>Description</Text>
      <TextInput
        placeholder="Enter description"
        onChangeText={setDescription}
        value={description}
      />
      <Text>Calories</Text>
      <TextInput
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
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
      <Button title="SAVE" onPress={handleSave} />
      <Button title="Cancel" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({});
