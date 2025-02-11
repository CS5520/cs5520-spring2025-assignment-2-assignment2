import ItemList from "../components/ItemsList";
import { Button, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../components/ThemeSwitch";
import { buttonColors } from '../constants/colors';

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToActivities: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToActivities, onGoToSettings }: AllActivitiesProps) {
  const { styles } = useTheme(); 

  return (
    <View style={styles.container} testID="all-diets-view">
      <View style={styles.header}>
          <View style={styles.switchButton}>
        <Button 
          title="Diets" 
          disabled={true}
          color={buttonColors.disabled}
        />
        <Button 
          title="Activities" 
          onPress={onGoToActivities}
          color={buttonColors.primary} 
        />
      </View>
      <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary}/>
      <ItemList type="diet" screenType="diets" />
    </View>
  );
}


