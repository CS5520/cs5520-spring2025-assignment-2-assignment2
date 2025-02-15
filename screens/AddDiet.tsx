import { View, Text, StyleSheet, Alert, Button, TextInput,} from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { writeToDB } from "../firebase/firestore";
import { useTheme } from "../ThemeContext";
import { ThemeContext } from"../ThemeContext"
import { useContext } from "react";

interface AddDietProps {
  closeddDiet: () => void;
}

export default function AddDiet({closeddDiet}: AddDietProps) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSave = async () => {
    if (!description || !calories || !date) {
      Alert.alert("Invalid Input", "Please check all fields.");
      return;
    }

    const parsedCalories = parseInt(calories, 10);
        if (isNaN(parsedCalories) || parsedCalories <= 0) {
            Alert.alert("Invalid Input", "Calories must be a positive number.");
            return;
        }

    const important = parsedCalories > 800;

    const newDiet = {
      description,
      calories,
      date: date ? Timestamp.fromDate(date) : null,
      important,
    };

    try {
      await writeToDB("diet",newDiet);
      setDescription("");
      setCalories("");
      setDate(new Date());
      closeddDiet();

    } catch (error) {
      console.error("Failed to add diet entry:", error);
      Alert.alert("Error", "Failed to add diet entry. Please try again.");
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false); 
  };

  return (
    <View testID="add-diet-view" style={[styles.absolutePage, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="add-diet" style={[styles.title, { color: theme.textColor }]}>Add Diet</Text>
      <Text style={[styles.label, { color: theme.textColor }]}>Description *</Text>
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Calories *</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
        keyboardType="numeric"
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
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
      <Button title="Cancel" onPress= {closeddDiet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  absolutePage: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#fff"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff", 
    paddingVertical: 12, 
    paddingHorizontal: 10, 
    borderRadius: 8, 
    marginTop: 5,
    fontSize: 16,
    width: "90%", 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, 
    alignSelf: "center",
    minHeight: 100,

  },
});
