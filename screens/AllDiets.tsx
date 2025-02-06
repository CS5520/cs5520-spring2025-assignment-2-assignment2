import { Button, StyleSheet, Text, View } from "react-native";
import { styles } from "../constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  return (
    <View testID="all-diets-view" style={styles.content}>
      <Text style={styles.title}>All Diets</Text>
      <Button title="Add" onPress={onAdd} />
      <Text testID="all-diets">All Diets</Text>
    </View>
  );
}