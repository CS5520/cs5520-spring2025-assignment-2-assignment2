import { View, Text, Button } from "react-native";
import { lightStyles, useTheme } from "../ThemeContext";
import { buttonColors } from "@/constants/colors";

interface SettingsProps {
  onGoToActivities: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
}
export default function Settings ({onGoToActivities, onGoToDiets, onGoToSettings}:SettingsProps ) {
  const { toggleTheme, styles = lightStyles} = useTheme();


  return (
    <View style={styles.container} testID="settings-view">
      <View style={styles.header}>
          <View style={styles.switchButton}>
      <Button title="Diets"  onPress={onGoToDiets} color={buttonColors.disabled}/>
      <Button title="Activities" onPress={onGoToActivities} color={buttonColors.disabled} />
      </View>
      <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="settings">Settings</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={buttonColors.primary}/>
    </View>
  );
};
