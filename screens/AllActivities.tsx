import ItemsList from "@/components/ItemsList";
import { Button, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import styles from "../constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { BGColor, TXTColor } = useContext(ThemeContext);
  return (
    <View
      testID="all-activities-view"
      style={[styles.container, { backgroundColor: BGColor }]}
    >
      <Text testID="all-activities" style={[styles.title, { color: TXTColor }]}>
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
