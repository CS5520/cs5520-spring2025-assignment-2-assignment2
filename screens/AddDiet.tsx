import { View, Text, StyleSheet, Alert, Button, TextInput } from "react-native";
import { Timestamp } from "firebase/firestore";
import { styles } from "../constants/styles";

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
  return (
    <View testID="add-diet-view" style={styles.content}>
      <Text testID="add-diet" style={styles.title}>
        Add Diet
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Description *</Text>
        <TextInput
          style={[styles.input, { paddingBottom: 100 }]}
          placeholder="Enter description"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Calories *</Text>
        <TextInput style={styles.input} placeholder="Enter calories" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Date *</Text>
        <TextInput style={styles.input} placeholder="Date" />
      </View>
      <View style={styles.adjacentButtonsContainer}>
        <Button title="Cancel" />
        <Button title="Save" />
      </View>
    </View>
  );
}
