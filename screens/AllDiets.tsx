import { Button, StyleSheet, Text, View } from "react-native";
import { styles } from "../constants/styles";
import ItemsList from "../components/ItemsList";
import { Diet } from "../constants/types";

interface AllDietsProps {
  onAdd: () => void;
}

export default function AllDiets({ onAdd }: AllDietsProps) {
  return (
    <View testID="all-diets-view" style={styles.content}>
      <Text style={styles.title}>All Diets</Text>
      <Button title="Add" onPress={onAdd} />
      <ItemsList type="diet" />
    </View>
  );
}
