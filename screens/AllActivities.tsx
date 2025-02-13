import {Text, View, Button } from "react-native";
import ItemList from "../components/ItemsList";
import { lightStyles, useTheme } from "../ThemeContext";
import { buttonColors } from "@/constants/colors";

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToDiets, onGoToSettings }: AllActivitiesProps) {
  const { toggleTheme, styles = lightStyles } = useTheme();

  return (
    <View style={styles.container} testID="all-activities-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button 
        title="Activities" 
        color={buttonColors.primary}/>
        <Button title="Diets" 
        onPress={onGoToDiets} 
        color={buttonColors.disabled} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="all-activities">All Activities</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary}/>
      <ItemList type="activities" screenType="activities"/>
    </View>
  );
}