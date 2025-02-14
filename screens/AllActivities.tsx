// AllActivities.tsx
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { TYPOGRAPHY, LAYOUT, COLORS } from "../constants/styles";
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

      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={onAdd} color={COLORS.PRIMARY} />
      </View>

      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LAYOUT.PADDING,
  },
  title: {
    ...TYPOGRAPHY.TITLE,
    fontSize: 32,
    textAlign: 'center',
    marginVertical: LAYOUT.MARGIN,
    fontWeight: '600',
  },
  addButton: {
    alignSelf: 'center',
    marginBottom: LAYOUT.MARGIN,
  },
  addButtonText: {
    ...TYPOGRAPHY.SUBTITLE,
    color: COLORS.PRIMARY,
    fontSize: 24,
  },

  buttonContainer: {
    alignSelf: 'center',
  },

});