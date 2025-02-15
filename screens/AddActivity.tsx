import { View, Text, StyleSheet, Alert, Button, TextInput,} from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "../ThemeContext";


interface AddActivityProps {
  closedActivity: () => void;
}

export default function AddActivity({ closedActivity }: AddActivityProps) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
      { label: "Walking", value: "Walking" },
      { label: "Running", value: "Running" },
      { label: "Swimming", value: "Swimming" },
      { label: "Weights", value: "Weights" },
      { label: "Yoga", value: "Yoga" },
      { label: "Cycling", value: "Cycling" },
      { label: "Hiking", value: "Hiking" }
  ]);


  const handleSave = async () => {
      if (!name || !duration || !date) {
        alert("Please fill in all fields.");
        return;
      }
      
      const parsedDuration = parseInt(duration, 10);
        if (isNaN(parsedDuration) || parsedDuration <= 0) {
          Alert.alert("Invalid Input", "Duration must be a positive number.");
          return;
      }

      const important = (name === "Running" || name === "Weights") && parsedDuration > 60;

      const newActivity = {
        id: "", // Firestore will auto-generate an ID
        name,
        duration,
        date: Timestamp.fromDate(date),
        important,
      };
  
      try {
        await writeToDB(newActivity, "activity");
        setName("");
        setDuration("");
        setDate(new Date());
        closedActivity();
  
      } catch (error) {
        console.error("Failed to add activity entry:", error);
        Alert.alert("Error", "Failed to add activity entry. Please try again.");
      }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
      if (selectedDate) {
        setDate(selectedDate);
      }
      setShowDatePicker(false); 
    };  

  // return (
  //   <View testID="add-activity-view">
  //     <Text testID="add-activity">Add Diet</Text>
  //   </View>
  // );


  return (
    <View testID="add-activity-view" style={[styles.absolutePage,{ backgroundColor: theme.backgroundColor }]} >
      <Text testID="add-activity" style={[styles.title, { color: theme.textColor }]}>Add Activity</Text>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
                testID="dropdown-picker"
                open={open}
                value={name}
                items={items}
                setOpen={setOpen}
                setValue={setName}
                setItems={setItems}
                style={styles.dropdown}
                placeholder="Select Activity"
                containerStyle={{ marginBottom: 10 }}
            />

      <Text style={[styles.label, { color: theme.textColor }]}>Duration *</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter Duration"
        keyboardType="numeric"
      />
      <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
        showSoftInputOnFocus={false}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline" 
          onChange={handleDateChange}
        />
      )}
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress= {closedActivity} />
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
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
},
});
