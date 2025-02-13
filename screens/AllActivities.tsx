import { Button, StyleSheet, Text, View } from "react-native";
import { styles } from "../constants/styles";
import ItemsList from "../components/ItemsList";
import { Activity } from "../constants/types";
import { useTheme } from "../ThemeContext";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { themeStyles } = useTheme();
  return (
    <View testID="all-activities-view" style={styles.content}>
      <Text style={[styles.title, { color: themeStyles.textColor }]}>All Activities</Text>
      <Button title="Add" onPress={onAdd} />
      <ItemsList type="activity" />
    </View>
  );
}
