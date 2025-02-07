import { StyleSheet, Text, View, Button } from "react-native";
import ItemsList from "../components/ItemsList";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

interface AllDietsProps {
  onAdd: () => void;
}

export default function AllDiets({ onAdd }: AllDietsProps) {
  const {theme} = useContext(ThemeContext);
  
  return (
    <View testID="all-diets-view">
      <Text testID="all-diets" style={[styles.title, {color: theme.textColor}]}>All Diets</Text>
      <View style={styles.button}>
        <Button title="Add" onPress={onAdd} />
      </View>
      <ItemsList type="diets" />
    </View>
  );
}
const styles = StyleSheet.create({
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
