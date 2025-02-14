import { View, Text, StyleSheet, Alert, Button, TextInput, Platform, TouchableOpacity } from "react-native";
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

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.descriptionInput, {
              borderColor: COLORS.INACTIVE,
              color: theme.textColor,
              backgroundColor: 'rgba(200, 200, 200, 0.1)'
            }]}
            placeholder="Enter description"
            placeholderTextColor="rgba(150, 150, 150, 0.8)"
            value={description}
            onChangeText={setDescription}
            multiline={true} // Add this to enable multiple lines
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Calories <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, {
              borderColor: COLORS.INACTIVE,
              color: theme.textColor,
              backgroundColor: 'rgba(200, 200, 200, 0.1)'
            }]}
            placeholder="Enter calories"
            placeholderTextColor="rgba(150, 150, 150, 0.8)"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Date <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, {
              borderColor: COLORS.INACTIVE,
              color: theme.textColor,
              backgroundColor: 'rgba(200, 200, 200, 0.1)'
            }]}
            placeholder="Select Date"
            placeholderTextColor="rgba(150, 150, 150, 0.8)"
            value={date.toDateString()}
            onPressIn={() => setShowDatePicker(!showDatePicker)}
            editable={true}
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="datetime-picker"
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.buttonContainer}>

          <Button title="Cancel" onPress={() => onSave()} />
          <Button title="Save" onPress={() => handleSave()} />

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.TITLE,
    fontSize: 32,
    textAlign: 'center',
    marginVertical: LAYOUT.MARGIN * 2,
  },
  formContainer: {
    paddingHorizontal: LAYOUT.PADDING * 1.5,
  },
  fieldContainer: {
    marginBottom: LAYOUT.MARGIN * 2,
  },
  label: {
    ...TYPOGRAPHY.SUBTITLE,
    fontSize: 20,
    marginBottom: LAYOUT.MARGIN,
  },
  required: {
    color: COLORS.PRIMARY,
    fontSize: 18,
  },
  input: {
    ...INPUT,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: LAYOUT.MARGIN * 4,
    paddingHorizontal: LAYOUT.PADDING * 3,
  },
  button: {
    flex: 1,
    marginHorizontal: LAYOUT.MARGIN,
  },
  buttonTextCancel: {
    ...TYPOGRAPHY.SUBTITLE,
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonTextSave: {
    ...TYPOGRAPHY.SUBTITLE,
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontSize: 18,
  },


  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
});