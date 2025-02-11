import ItemsList from "@/components/ItemsList";
import { Button, Text, View } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import styles from "../constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}
/**
 * AllActivities Component
 * Displays a list of activity entries and provides a button to add new entries
 */
export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      testID="all-activities-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="all-activities"
        style={[styles.title, { color: theme.textColor }]}
      >
        All Activities
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={onAdd} />
      </View>
      <View style={styles.listContainer}>
        <ItemsList collectionName="activities" />
      </View>
    </View>
  );
}
