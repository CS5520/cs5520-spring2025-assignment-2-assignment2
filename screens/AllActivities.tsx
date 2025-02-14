import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ItemsList from "../components/ItemsList";
import { ThemeContext } from "../ThemeContext";
import { Spacing, Colors } from "../constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}

const AllActivities: React.FC<AllActivitiesProps> = ({ onAdd }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>All Activities</Text>
      <View style={styles.addButtonWrapper}>
        <Button
          title="Add"
          onPress={onAdd}
          color={Colors.primary}
        />
      </View>
      <ItemsList type="activity" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: Spacing.small,
    textAlign: "center",
  },
  addButtonWrapper: {
    marginBottom: Spacing.medium,
    alignSelf: "center",
  },
});


export default AllActivities;
