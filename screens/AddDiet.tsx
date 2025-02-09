import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { writeToDB } from "../firebase/firestore";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";

export interface Diet {
  calories: number;
  description: string;
  date: Timestamp;
  important: boolean;
}

interface AddDietProps {
  onSave: () => void;
  onBack: () => void;
  onGoToSettings: () => void;
}

export default function AddDiet({ onSave, onBack, onGoToSettings }: AddDietProps) {
  const [calories, setCalories] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [important, setImportant] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [inputDateValue, setInputDateValue] = useState<string>("");

  const toggleDatePicker = () => {
    setShow(!show);
  }

  const handleDatePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      setInputDateValue(selectedDate.toLocaleDateString());
    }
  }

  const handleCancel = () => {
    setCalories("");
    setDescription("");
    setDate(new Date());
    setImportant(false);
    onBack();
  }

  const handleSave = async () => {
    if (!calories || !description || !date || isNaN(Number(calories)) || Number(calories) <= 0) {
      Alert.alert("Invalid Input", "Please enter valid values for all fields");
      return;
    }

    const isImportant = Number(calories) > 800;

    try {
      const dietData: Diet = {
        calories: Number(calories),
        description: description,
        date: Timestamp.fromDate(date), 
        important: isImportant
      };

      await writeToDB('diets', dietData);
      onSave();
    } catch (error) {
      Alert.alert("Error", "Failed to save diet");
    }
  };

  return (
    <View testID="add-diet-view" style={styles.container}>
      <View style={styles.header}>
      <View style={styles.switchButton}>
      <Button title="Diets" disabled={true} />
          <Button title="Activities" disabled={true} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} />
      </View>

    <View style={styles.buttomContainer}>
      <Text testID="add-diet" style={styles.title}>Add Diet</Text>
      <Text style={styles.text}>Description *</Text>  
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Text style={styles.text}>Calories *</Text>
      <TextInput
        placeholder="Enter calories"
        value={calories}
        onChangeText={setCalories}
        style={styles.input}
      />
      <Text style={styles.text}>Date *</Text>
      <TextInput
        style={styles.input}
        placeholder="Select Date"
        value={inputDateValue}
        onFocus={toggleDatePicker} 
        testID="datetime-picker" 
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
      <Button title="Cancle" onPress={handleCancel} />
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
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: "space-evenly",
  }
});

