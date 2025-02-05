import { Button, StyleSheet, Text, View } from "react-native";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  return (
    <View testID="all-diets-view">
      <Text testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} />
    </View>
  );
}
const styles = StyleSheet.create({});
