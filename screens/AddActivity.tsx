import { View, Text, StyleSheet, Alert, Button, TextInput, Platform } from "react-native";
import { useState, useContext } from "react";
import { Timestamp } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemeContext } from "../ThemeContext";
import { TYPOGRAPHY, LAYOUT, COLORS, INPUT } from "../constants/styles";
import { writeToDB } from "../firebase/firestore";

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

      const result = await writeToDB('activities', {
        activity,
        duration,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });

      if (result) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving activity:', error);
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

      <Text style={[styles.label, { color: theme.textColor }]}>Activity</Text>
      <DropDownPicker
        testID="dropdown-picker"
        open={isDropdownOpen}
        value={activity}
        items={items}
        setOpen={setIsDropdownOpen}
        setValue={setActivity}
        setItems={() => { }}
        style={[styles.dropdown, { marginBottom: isDropdownOpen ? 120 : LAYOUT.MARGIN }]}
        dropDownContainerStyle={styles.dropdownContainer}
        listMode="SCROLLVIEW"
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Duration</Text>
      <TextInput
        style={[styles.input, { borderColor: COLORS.INACTIVE, color: theme.textColor }]}
        placeholder="Duration in minutes"
        placeholderTextColor={COLORS.INACTIVE}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Date</Text>
      <TextInput
        style={[styles.input, { borderColor: COLORS.INACTIVE, color: theme.textColor }]}
        placeholder="Date"
        placeholderTextColor={COLORS.INACTIVE}
        value={date.toDateString()}
        onPressIn={() => setShowDatePicker(true)}
        editable={true}
      />

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
        <Button title="Cancel" onPress={onSave} />
        <Button
          title="Save"
          onPress={() => {
            handleSave().catch(error => {
              console.error('Save error:', error);
              Alert.alert('Error', 'Failed to save');
            });
          }}
        />
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
  dropdown: {
    borderColor: COLORS.INACTIVE,
  },
  dropdownContainer: {
    borderColor: COLORS.INACTIVE,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: LAYOUT.MARGIN * 2,
  },
});