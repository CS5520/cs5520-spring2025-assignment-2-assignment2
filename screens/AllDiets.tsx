// AllDiets.tsx
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/ThemeContext";
import { TYPOGRAPHY, LAYOUT, COLORS } from "../constants/styles";
import ItemsList from "@/components/ItemsList";

interface AllDietsProps {
  onAdd: () => void;
}

export default function AllDiets({ onAdd }: AllDietsProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      testID="all-diets-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="all-diets"
        style={[
          styles.title,
          { color: theme.textColor }
        ]}
      >
        All Diets
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <ItemsList type="diets" />
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
});