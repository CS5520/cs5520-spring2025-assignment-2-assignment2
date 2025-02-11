import ItemsList from "@/components/ItemsList";
import { Button, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import styles from "../constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}
/**
 * AllDiets Component
 * Displays a list of diet entries and provides a button to add new entries
 */
export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      testID="all-diets-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="all-diets"
        style={[styles.title, { color: theme.textColor }]}
      >
        All Diets
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={onAdd} />
      </View>
      <View style={styles.listContainer}>
        <ItemsList collectionName="diet" />
      </View>
    </View>
  );
}
