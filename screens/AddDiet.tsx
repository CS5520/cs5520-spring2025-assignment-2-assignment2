import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { writeToDB } from "../firebase/firestore";
import { ThemeContext } from "../ThemeContext";
import { Colors, Spacing } from "../constants/styles";

interface AddDietProps {
  onSave: () => void;
}

const AddDiet: React.FC<AddDietProps> = ({ onSave }) => {
  const [description, setDescription] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme.background === "#121212";

  const toggleDatePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    // Validate description
    if (description.trim() === "") {
      Alert.alert("Invalid input", "Please check your description.");
      return;
    }

    // Validate calories
    if (calories.trim() === "" || isNaN(Number(calories)) || Number(calories) <= 0) {
      Alert.alert("Invalid input", "Please check your calories. They must be a positive number.");
      return;
    }

    // Validate date
    if (!date) {
      Alert.alert("Invalid input", "Please check your date.");
      return;
    }

    const isImportant = Number(calories) > 800;

    try {
      await writeToDB("diets", {
        description: description,
        calories: calories,
        date: Timestamp.fromDate(date),
        important: isImportant,
      });
      onSave();
    } catch (error) {
      Alert.alert("Error", "There was an error saving the diet entry.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    onSave();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
      testID="add-diet-view"
    >
      <Text style={[styles.header, { color: theme.text }]} testID="add-diet">
        Add Diet
      </Text>

      <Text style={[styles.label, { color: theme.text }]}>Description *</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          {
            backgroundColor: theme.cardBackground,
            color: theme.cardText,
            borderColor: Colors.border,
          },
        ]}
        placeholder="Enter description"
        placeholderTextColor="#888"
        multiline
        value={description}
        onChangeText={setDescription}
        testID="description-input"
      />

      <Text style={[styles.label, { color: theme.text }]}>Calories *</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.numericBackground,
            color: theme.numericText,
            borderColor: Colors.border,
          },
        ]}
        placeholder="Enter calories"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        testID="calories-input"
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

      <Modal
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.cancelButton,
            { backgroundColor: theme.cardBackground },
          ]}
          onPress={handleCancel}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            { backgroundColor: Colors.primary },
          ]}
          testID="save-diet-button"
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDiet;

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
  textArea: {
    height: 80,
    textAlignVertical: "top",
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
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#D3D3D3",
  },
  saveButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
});