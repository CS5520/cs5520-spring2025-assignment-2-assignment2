import { View, Text, StyleSheet, Alert, Button } from "react-native";

import { Timestamp } from "firebase/firestore";

export interface Activity {
  duration: string;
  activity: string;
  date: Timestamp;
  important: boolean;
}
interface AddActivityProps {
  onSave: () => void;
}
export default function AddActivity({ onSave }: AddActivityProps) {
  return (
    <View testID="add-activity-view">
      <Text testID="add-activity">Add Diet</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
