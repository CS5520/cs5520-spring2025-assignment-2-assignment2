import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { Timestamp } from "firebase/firestore";

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
    <View testID="add-diet-view">
      <Text testID="add-diet">Add Diet</Text>
      <Button title="SAVE" onPress={onSave} />
      <Button title="Cancel" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({});
