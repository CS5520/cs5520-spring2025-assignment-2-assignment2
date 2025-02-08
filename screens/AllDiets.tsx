import ItemsList from "@/components/ItemsList";
import { Button, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { BGColor, TXTColor } = useContext(ThemeContext);
  return (
    <View testID="all-diets-view" style={{ backgroundColor: BGColor }}>
      <Text testID="all-diets" style={{ color: TXTColor }}>
        All Diets
      </Text>
      <ItemsList collectionName="diet" />
      <Button title="Add" onPress={onAdd} />
    </View>
  );
}
const styles = StyleSheet.create({});
