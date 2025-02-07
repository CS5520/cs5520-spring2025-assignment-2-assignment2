import { StyleSheet, Text, View, Button } from "react-native";
import ItemsList from "../components/ItemsList";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const {theme} = useContext(ThemeContext);
  
  return (
    <View testID="all-activities-view" style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text testID="all-activities" style={[styles.title, {color: theme.textColor}]}>All Activities</Text>
      <View style={styles.button}>
        <Button title="Add" onPress={onAdd} />
      </View>
      <ItemsList type="activities"/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
  },
});
