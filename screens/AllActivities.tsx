import {Text, View, Button } from "react-native";
import ItemList from "../components/ItemsList";
import { darkStyles, useTheme } from "../ThemeContext";
import { buttonColors } from "@/constants/colors";

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
  screen: string; 
}

export default function AllActivities({ onAdd, onGoToDiets, onGoToSettings, screen }: AllActivitiesProps) {
  const { styles=darkStyles } = useTheme();

  const getButtonColor = (targetScreen: string) => {
    return screen === targetScreen ? buttonColors.primary : buttonColors.disabled;
  };

  return (
    <View style={styles.container} testID="all-activities-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button 
        title="Activities" 
        color={getButtonColor("allActivities")} 
        />
        <Button title="Diets" 
        onPress={onGoToDiets} 
        color={getButtonColor("allDiets")}
        />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="all-activities">All Activities</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary}/>
      <ItemList type="activities" screenType="activities"/>
    </View>
  );
}