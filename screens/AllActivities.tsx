import { StyleSheet, Text, View, Button } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { TYPOGRAPHY, LAYOUT } from "../constants/styles";
import ItemsList from "../components/ItemsList";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      testID="all-activities-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="all-activities"
        style={[
          styles.title,
          { color: theme.textColor }
        ]}
      >
        All Activities
      </Text>
      <Button title="Add" onPress={onAdd} />
      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.TITLE,
    textAlign: 'center',
    marginVertical: LAYOUT.MARGIN,
  },
});