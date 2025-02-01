import { StyleSheet, Text, View, Button } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { TYPOGRAPHY, LAYOUT } from "../constants/styles";
import ItemsList from "../components/ItemsList";

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
      <Button title="Add" onPress={onAdd} />
      <ItemsList type="diets" />
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