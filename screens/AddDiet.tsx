import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import Input from "@/components/Input";
import { writeToDB } from "@/firebase/firestore";
import DatePicker from "@/components/DatePicker";
import { useContext } from "react";
import { ThemeContext } from "@/ThemeContext";
import { color, commonTitleStyles, commonButtonContainerStyles } from "@/constants/styles";

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
  const { theme } = useContext(ThemeContext);
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Validate inputs
  const validateInputs = (): boolean => {
    if (!description || !calories|| !date) {
      Alert.alert("Invalid Input", "You have missed some information. Please check");
      return false;
    }
    if (isNaN(Number(calories)) || Number(calories) < 0) {
      Alert.alert("Invalid Input", "Calories should be a positive number. Please check");
      return false;
    }
    return true;
  };

  function handleSave() {
    if (!validateInputs()) {
      return;
    }

    const important = ( Number(calories) > 800 ) ? true : false;
    const newDiet: Diet = {
      description,
      calories,
      date: Timestamp.fromDate(date as Date),
      important,
    };
    writeToDB("diets", newDiet);
    onSave();
  }

  return (
    <View 
      testID="add-diet-view" 
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text 
        testID="add-diet" 
        style={[commonTitleStyles.title, styles.title, { color: theme.textColor }]}>
      Add Diet
      </Text>
      <Input 
        label="Description*"
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription} 
      />
      <Input
        label="Calories*"
        placeholder="Enter calories"
        value={calories}
        onChangeText={setCalories}
      />
      <DatePicker 
        date={date} 
        onDateChange={setDate} 
      />
      <View 
        style={[commonButtonContainerStyles.buttonContainer, styles.buttonContainer]}
      >
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
  buttonContainer: {
    justifyContent: 'space-around',
    marginTop: 40,
  },
});

