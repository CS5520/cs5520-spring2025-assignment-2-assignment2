import { View, Text, Button } from "react-native";
import { useTheme } from "../ThemeContext"; // Import theme context and styles
import { darkStyles } from "@/constants/styles";
import { buttonColors } from "@/constants/colors"; // Import color constants

// Define the props for the Settings component
interface SettingsProps {
  onGoToActivities: () => void; // Function to navigate to activities
  onGoToDiets: () => void; // Function to navigate to diets
  onGoToSettings: () => void; // Function to navigate to settings
}

// Define the Settings component
export default function Settings ({onGoToActivities, onGoToDiets, onGoToSettings}:SettingsProps ) {
  // Get theme context values (toggleTheme, styles, theme)
  const { toggleTheme, styles = darkStyles, theme} = useTheme();

  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]} testID="settings-view">
      <View style={styles.header}>
          <View style={styles.switchButton}>
            <Button title="Activities" onPress={onGoToActivities} color={buttonColors.disabled} />
            <Button title="Diets" onPress={onGoToDiets} color={buttonColors.disabled}/>
          </View>
          <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={[styles.title,{color:theme.textColor}]} testID="settings">Settings</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={buttonColors.primary}/>
    </View>
  );
};
