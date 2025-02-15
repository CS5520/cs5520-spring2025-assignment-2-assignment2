import { View, Text, StyleSheet, Alert, Button, TextInput,} from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { writeToDB } from "../firebase/firestore";

interface AddDietProps {
  closeddDiet: () => void;
}

export default function AddDiet({closeddDiet}: AddDietProps) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!description || !calories || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const parsedCalories = parseInt(calories, 10);
        if (isNaN(parsedCalories) || parsedCalories <= 0) {
            Alert.alert("Invalid Input", "Calories must be a positive number.");
            return;
        }

    const important = parsedCalories > 800;

    const newDiet = {
      id: "", // Firestore will auto-generate an ID
      description,
      calories,
      date: Timestamp.fromDate(date),
      important,
    };

    try {
      await writeToDB(newDiet, "diet");
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
    setShowDatePicker(false); // 关闭 DateTimePicker
  };

  return (
    <View style={styles.absolutePage}>
      <Text style={styles.title}>Add Diet</Text>
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Text style={styles.label}>Calories *</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Date *</Text>
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
      <Button title="Back" onPress= {closeddDiet} />
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
    backgroundColor: "white",
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // 半透明背景
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff", // 确保输入框背景是白色
    paddingVertical: 12, // 调整内边距，让输入框高度更合适
    paddingHorizontal: 10, // 左右填充
    borderRadius: 8, // 使输入框边角更圆润
    marginTop: 5,
    fontSize: 16, // 文字大小
    width: "90%", // 让输入框宽度填充
    shadowColor: "#000", // iOS 阴影
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, 
    alignSelf: "center",
    minHeight: 100,

  },
});
