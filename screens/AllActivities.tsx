import { Button, StyleSheet, Text, View } from "react-native";
import { styles } from "../constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  return (
    <View testID="all-activities-view" style={styles.content}>
      <Text style={styles.title}>All Activities</Text>
      <Button title="Add" onPress={onAdd} />
      <Text testID="all-activities">All Activities</Text>
    </View>
  );
}
