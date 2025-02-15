import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ItemsList from "../components/ItemsList";
import { ThemeContext } from "../ThemeContext";
import { Spacing, Colors } from "../constants/styles";

interface AllDietsProps {
  onAdd: () => void;
}

const AllDiets: React.FC<AllDietsProps> = ({ onAdd }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View testID="all-diets-view" style={[styles.container, { backgroundColor: theme.background }]}>
      <Text testID="all-diets" style={{ ...styles.title, color: theme.text }} >
        All Diets
      </Text>

      <TouchableOpacity onPress={onAdd} style={styles.addWrapper}>
        <Text style={[styles.addText, { color: "#007BFF" }]}>Add</Text>
      </TouchableOpacity>

      <ItemsList type="diet" />
    </View>
  );
};

export default AllDiets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.small,
  },
  addWrapper: {
    alignSelf: "center",
    marginBottom: Spacing.medium,
  },
  addText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});