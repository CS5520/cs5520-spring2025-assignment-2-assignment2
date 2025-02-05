import { Button, StyleSheet, Text, View } from "react-native";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  return (
    <View testID="all-activities-view">
      <Text testID="all-activities">All Activities</Text>
      <Button title="Add" onPress={onAdd} />
    </View>
  );
}
const styles = StyleSheet.create({});
