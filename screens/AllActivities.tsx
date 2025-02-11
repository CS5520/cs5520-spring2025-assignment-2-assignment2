import {Text, View, Button } from "react-native";
import ItemList from "../components/ItemsList";
import { useTheme } from "../components/ThemeSwitch";
import { buttonColors } from "@/constants/colors";

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToDiets, onGoToSettings }: AllActivitiesProps) {
  const { styles } = useTheme(); 

  return (
    <View style={styles.container} testID="all-activities-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button title="Activities"  disabled={true} color={buttonColors.disabled}/>
        <Button title="Diets" onPress={onGoToDiets} color={buttonColors.primary} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="all-activities">All Activities</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary}/>
      <ItemList type="activity" screenType="activities"/>
    </View>
  );
}