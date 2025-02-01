import { View, Text, StyleSheet, Alert, Button, TextInput, Platform } from "react-native";
import { useState, useContext } from "react";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from "../ThemeContext";
import { TYPOGRAPHY, LAYOUT, COLORS, INPUT } from "../constants/styles";
import { writeToDB } from "../firebase/firestore";

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
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateInputs = () => {
    if (!description || !calories) {
      Alert.alert('Invalid Input', 'Please check all fields are filled');
      return false;
    }

    const caloriesNum = Number(calories);
    if (isNaN(caloriesNum) || caloriesNum <= 0) {
      Alert.alert('Invalid Input', 'Please check calories is a positive number');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    const caloriesNum = Number(calories);
    const isImportant = caloriesNum > 800;

    try {
      await writeToDB('diets', {
        description,
        calories,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });
      onSave();
    } catch (error) {
      Alert.alert('Error', 'Failed to save diet entry');
    }
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    setDate(currentDate);
  };

  return (
    <View
      testID="add-diet-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="add-diet"
        style={[styles.title, { color: theme.textColor }]}
      >
        Add Diet
      </Text>

      <Text style={[styles.label, { color: theme.textColor }]}>Description</Text>
      <TextInput
        style={[styles.input, { borderColor: COLORS.INACTIVE, color: theme.textColor }]}
        placeholder="Description"
        placeholderTextColor={COLORS.INACTIVE}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Calories</Text>
      <TextInput
        style={[styles.input, { borderColor: COLORS.INACTIVE, color: theme.textColor }]}
        placeholder="Calories"
        placeholderTextColor={COLORS.INACTIVE}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Date</Text>


      {/* <TextInput
        style={[styles.input, { borderColor: COLORS.INACTIVE, color: theme.textColor }]}
        placeholder="Date"
        placeholderTextColor={COLORS.INACTIVE}
        value={date.toDateString()}
        onPressIn={handleDatePress}
        editable={true}
      />

      {showDatePicker && (
        <DateTimePicker
          testID="datetime-picker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )} */}


      <TextInput
        style={[styles.input, { borderColor: COLORS.INACTIVE, color: theme.textColor }]}
        placeholder="Date"
        placeholderTextColor={COLORS.INACTIVE}
        value={date.toDateString()}
        onPressIn={() => {
          setShowDatePicker(!showDatePicker); // Toggle the picker visibility
        }}
        editable={true}
      />

      {showDatePicker && (
        <DateTimePicker
          testID="datetime-picker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            if (Platform.OS === 'android') {
              setShowDatePicker(false);
            }
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}




      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onSave} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: LAYOUT.PADDING,
  },
  title: {
    ...TYPOGRAPHY.TITLE,
    textAlign: 'center',
    marginBottom: LAYOUT.MARGIN * 2,
  },
  label: {
    ...TYPOGRAPHY.SUBTITLE,
    marginVertical: LAYOUT.MARGIN / 2,
  },
  input: {
    ...INPUT,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: LAYOUT.MARGIN * 2,
  },
});