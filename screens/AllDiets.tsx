import ItemList from "../components/ItemsList";
import { Button, Text, View } from "react-native";
import { darkStyles, useTheme } from "../ThemeContext";
import { buttonColors } from '../constants/colors';

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToActivities: () => void;
  onGoToSettings: () => void;
  screen:string
}

export default function AllActivities({ onAdd, onGoToActivities, onGoToSettings, screen }: AllActivitiesProps) {
  const { theme, styles=darkStyles} = useTheme(); 
  console.log('AllDiets styles:', styles);

  const getButtonColor = (targetScreen: string) => {
    return screen === targetScreen ? buttonColors.primary : buttonColors.disabled;
  };


  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]} testID="all-diets-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button 
            title="Activities" 
            onPress={onGoToActivities}
            color={getButtonColor("allActivities")}
          />
          <Button 
            title="Diets" 
            color={getButtonColor("allDiets")}
          />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={[styles.title,{color:theme.textColor}]} testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary}/>
      <ItemList type="diets" screenType="diets" />
    </View>
  );
}


