import { View, Text, StyleSheet, Alert, Button, TextInput, Platform, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from "@/ThemeContext";
import { TYPOGRAPHY, LAYOUT, COLORS, INPUT } from "../constants/styles";
import { writeToDB } from "@/firebase/firestore";

const ACTIVITIES = [
  { label: 'Walking', value: 'Walking' },
  { label: 'Running', value: 'Running' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Weights', value: 'Weights' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Hiking', value: 'Hiking' },
];

interface AddActivityProps {
  onSave: () => void;
}

export default function AddActivity({ onSave }: AddActivityProps) {
  const { theme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items] = useState(ACTIVITIES);
  const [activity, setActivity] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateInputs = () => {
    if (!activity || !duration) {
      Alert.alert('Invalid Input', 'Please check all fields are filled');
      return false;
    }

    const durationNum = Number(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert('Invalid Input', 'Please check duration is a positive number');
      return false;
    }

    return true;
  };


  const handleSave = async () => {
    if (!validateInputs()) return;

    try {
      const durationNum = Number(duration);
      const isImportant = (activity === 'Running' || activity === 'Weights') && durationNum > 60;

      await writeToDB('activities', {
        activity,
        duration,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });

      onSave();


    } catch (error) {
      // console.error('Error saving activity:', error);
      Alert.alert('Error', 'Failed to save activity');
    }
  };


  return (
    <View
      testID="add-activity-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="add-activity"
        style={[styles.title, { color: theme.textColor }]}
      >
        Add Activity
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Activity <Text style={styles.required}>*</Text>
          </Text>
          <DropDownPicker
            testID="dropdown-picker"
            open={isDropdownOpen}
            value={activity}
            items={items}
            setOpen={setIsDropdownOpen}
            setValue={setActivity}
            setItems={() => { }}
            style={[styles.dropdown, {
              borderColor: COLORS.INACTIVE,
              backgroundColor: 'rgba(200, 200, 200, 0.1)',
              marginBottom: isDropdownOpen ? 120 : LAYOUT.MARGIN
            }]}
            dropDownContainerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
            placeholder="Select activity"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>
            Duration <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, {
              borderColor: COLORS.INACTIVE,
              color: theme.textColor,
              backgroundColor: 'rgba(200, 200, 200, 0.1)'
            }]}
            placeholder="Enter duration in minutes"
            placeholderTextColor="rgba(150, 150, 150, 0.8)"
            value={duration}
            // onChangeText={setDuration}
            onChangeText={(text) => setDuration(text)} // Immediate update
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
    color: COLORS.DANGER,
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
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownContainer: {
    borderColor: COLORS.INACTIVE,
    borderRadius: 8,
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
});