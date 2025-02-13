import ItemList from "../components/ItemsList";
import { Button, Text, View } from "react-native";
import { darkStyles, useTheme } from "../ThemeContext";
import { buttonColors } from '../constants/colors';

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToActivities: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToActivities, onGoToSettings }: AllActivitiesProps) {
  const { styles=darkStyles} = useTheme(); 
  console.log('AllDiets styles:', styles);


  return (
    <View style={styles.container} testID="all-diets-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button 
            title="Activities" 
            onPress={onGoToActivities}
            color={buttonColors.disabled} 
          />
          <Button 
            title="Diets" 
            color={buttonColors.primary}
          />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary}/>
      <ItemList type="diets" screenType="diets" />
    </View>
  );
}


