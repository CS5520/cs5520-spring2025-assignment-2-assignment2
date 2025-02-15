import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '@/ThemeContext';
import { useContext } from 'react';
import { color, commonTextStyles } from '@/constants/styles';

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (selectedDate: Date) => void;
}

const DatePicker = ({ date, onDateChange}: DatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext);

  function toggleDatePicker() {
    setShowDatePicker((prevState) => !prevState);
    if (!date) {
      onDateChange(new Date()); 
    }
  };
    
  return (
    <View style={styles.dateContainer}>
      <Text style={[commonTextStyles.text, { color: theme.textColor }]}>Date*</Text>
      <TouchableOpacity onPressIn={toggleDatePicker} >
        <View pointerEvents="none">
        <TextInput
          placeholder="Select date"
          value={date ? date.toDateString() : ""}
          style={[styles.input, 
            { backgroundColor: theme.backgroundColor === color.tertiaryColor ?
            color.white : color.primaryColor }]}
        />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <View style={styles.datePickerContainer}>
          <View style={[styles.datePickerWrapper, 
            { backgroundColor: theme.backgroundColor === color.tertiaryColor ? 
            color.white : color.primaryColor }]}>
            <DateTimePicker
              testID="datetime-picker"
              value={date || new Date()}
              display="inline"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  onDateChange(selectedDate);
                }
                if (Platform.OS !== 'ios') {
                  setShowDatePicker(false); 
                }
              }} 
            />
          </View>
        </View>
      )}

    </View>
)};

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  datePickerContainer: {
    width: '95%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  datePickerWrapper: {
    width: '100%',
  }    
});

export default DatePicker

