import ItemList from "../components/ItemsList"; // Import the custom ItemList component
import { Button, Text, View } from "react-native"; // Import the Button, Text, and View components from React Native
import { useTheme } from "../ThemeContext"; // Import the custom theme and styles
import { darkStyles } from "@/constants/styles";
import { buttonColors } from '../constants/colors'; // Import button color constants

// Define the props type for the AllActivities component
interface AllActivitiesProps {
  onAdd: () => void; // Callback function for adding an activity
  onGoToActivities: () => void; // Callback function for navigating to the activities page
  onGoToSettings: () => void; // Callback function for navigating to the settings page
  screen: string; // Current screen type, used to determine which button is selected
}

export default function AllActivities({ onAdd, onGoToActivities, onGoToSettings, screen }: AllActivitiesProps) {
  const { theme, styles = darkStyles } = useTheme(); // Get the current theme and styles
  console.log('AllDiets styles:', styles); // Log styles for debugging purposes

  // Dynamically set the button color based on the current screen
  const getButtonColor = (targetScreen: string) => {
    return screen === targetScreen ? buttonColors.primary : buttonColors.disabled;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} testID="all-diets-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
          <Button 
            key="activities-button" 
            title="Activities" 
            onPress={onGoToActivities} 
            color={getButtonColor("allActivities")} // Set the color based on screen
          />
          <Button 
            key="diets-button" 
            title="Diets" 
            color={getButtonColor("allDiets")} // Set the color based on screen
          />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary} />
      </View>
      <Text style={[styles.title, { color: theme.textColor }]} testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary} />
      <ItemList type="diets" screenType="diets" /> 
    </View>
  );
}


