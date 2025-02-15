import React, { useState, useContext } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Pressable, Modal } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ThemeContext } from "../ThemeContext";
import { Colors, Spacing } from "../constants/styles";
import CustomButton from "@/CustomButtons";

interface AddActivityProps {
  onSave: () => void;
}

const AddActivity: React.FC<AddActivityProps> = ({ onSave }) => {
  const [activityType, setActivityType] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weight Training", value: "Weight Training" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme.background === "#121212";

  const toggleDatePicker = () => {
    setShowDatePicker(prev => !prev);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    // Validate activity type
    if (!activityType) {
      Alert.alert("Invalid input", "Please check your activity type.");
      return;
    }

    // Validate duration
    if (duration.trim() === "" || isNaN(Number(duration)) || Number(duration) <= 0) {
      Alert.alert("Invalid input", "Please check your duration. It must be a positive number.");
      return;
    }

    // Validate date
    if (!date) {
      Alert.alert("Invalid input", "Please check your date.");
      return;
    }

    const isImportant =
      (activityType === "Running" || activityType === "Weight Training") &&
      Number(duration) > 60;

    try {
      await writeToDB("activities", {
        activity: activityType,
        duration,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });
      onSave();
    } catch (error) {
      Alert.alert("Error", "There was an error saving the activity.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    onSave();
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        if (open) setOpen(false);
      }}
    >
      <View
        style={[styles.container, { backgroundColor: theme.background }]}
        testID="add-activity-view"
      >
        <Text style={[styles.header, { color: theme.text }]} testID="add-activity">
          Add Activity
        </Text>

        <Text style={[styles.label, { color: theme.text }]}>Activity *</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            testID="dropdown-picker"
            open={open}
            value={activityType}
            items={items}
            setOpen={setOpen}
            setValue={setActivityType}
            setItems={setItems}
            placeholder="Select Activity"
            placeholderStyle={{ color: "#888" }}
            style={[styles.dropdown, { backgroundColor: "#FFFFFF", borderColor: Colors.border }]}
            textStyle={{ color: "#000000" }}
            dropDownContainerStyle={[
              styles.dropdownContainer,
              { backgroundColor: "#FFFFFF", borderColor: Colors.border },
            ]}
            listItemLabelStyle={{ color: "#000000" }}
            containerStyle={{ marginBottom: Spacing.medium }}
            listMode="SCROLLVIEW"
          />
        </View>

        <Text style={[styles.label, { color: theme.text }]}>Duration (min) *</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.numericBackground,
              color: theme.numericText,
              borderColor: Colors.border,
            },
          ]}
          placeholder="Enter duration"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
          testID="duration-input"
        />

        <Text style={[styles.label, { color: theme.text }]}>Date *</Text>
        <TextInput
          placeholder="Select Date"
          placeholderTextColor="#888"
          value={date ? date.toDateString() : ""}
          onPressIn={toggleDatePicker}
          editable={false}
          style={[
            styles.input,
            {
              backgroundColor: theme.dateBackground,
              color: theme.dateText,
              borderColor: Colors.border,
            },
          ]}
          testID="date-input"
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            label="Cancel"
            onPress={handleCancel}
            backgroundColor={Colors.secondary}
            textColor="#000000"
            testID="cancel-button"
          />
          <CustomButton
            label="Save"
            onPress={handleSave}
            backgroundColor={Colors.primary}
            textColor="#FFFFFF"
            testID="save-button"
          />
        </View>

        <Modal
          testID="date-picker-modal" 
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.dateBackground },
              ]}
            >
              <DateTimePicker
                testID="datetime-picker"
                value={date || new Date()}
                mode="date"
                display="inline"
                themeVariant={isDarkMode ? "dark" : "light"}
                textColor={theme.text}
                onChange={onDateChange}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={{ color: theme.text }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Pressable>
  );
};

export default AddActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
  },
  header: {
    fontSize: 24,
    marginBottom: Spacing.large,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.small,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: Spacing.medium,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: Spacing.large,
  },
  dateText: {
    fontSize: 16,
    textAlign: "left",
    paddingVertical: 12,
  },
});