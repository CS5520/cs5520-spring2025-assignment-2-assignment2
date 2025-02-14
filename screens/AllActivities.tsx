import { Text, View, Button } from "react-native"; // Import core components from React Native
import ItemList from "../components/ItemsList"; // Import ItemList component for displaying activity items
import { useTheme } from "../ThemeContext"; // Import theme context and styles (default to dark theme)
import { darkStyles } from "@/constants/styles";
import { buttonColors } from "@/constants/colors"; // Import button color constants

// Define the props for the AllActivities component
interface AllActivitiesProps {
  onAdd: () => void; // Function to handle adding new activities
  onGoToDiets: () => void; // Function to navigate to the diets section
  onGoToSettings: () => void; // Function to navigate to the settings section
  screen: string; // The current screen name to determine the active button
}

// Define the AllActivities component
export default function AllActivities({ onAdd, onGoToDiets, onGoToSettings, screen }: AllActivitiesProps) {
  // Access theme context values (theme, styles) from useTheme hook
  const { theme, styles = darkStyles } = useTheme();

  // Function to determine the button color based on the target screen
  const getButtonColor = (targetScreen: string) => {
    // If the current screen matches the target screen, return primary color; otherwise, return disabled color
    return screen === targetScreen ? buttonColors.primary : buttonColors.disabled;
  };

  return (
    // Container holding the entire view, applying background color based on the theme
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} testID="all-activities-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
          <Button 
            key="activities-button" 
            title="Activities" 
            color={getButtonColor("allActivities")} 
          />
          <Button 
            key="diets-button" 
            title="Diets" 
            onPress={onGoToDiets} 
            color={getButtonColor("allDiets")} 
          />
        </View>
        <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary} />
      </View>
      <Text style={[styles.title, { color: theme.textColor }]} testID="all-activities">
        All Activities
      </Text>
      <Button title="Add" onPress={onAdd} color={buttonColors.primary} />
      <ItemList type="activities" screenType="activities" />
    </View>
  );
}
