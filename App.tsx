// Importing necessary React and React Native components
import React, { useState } from "react";
import { View } from "react-native";
// Importing custom components and theme provider
import { ThemeProvider, useTheme } from "./ThemeContext";
import AllActivities from "./screens/AllActivities";
import AddActivity from "./screens/AddActivity";
import AllDiets from "./screens/AllDiets";
import AddDiet from "./screens/AddDiet";
import Settings from "./screens/Settings";

// Defining type for screen names
type ScreenType = "allActivities" | "addActivity" | "allDiets" | "addDiet" | "settings";

export default function App() {
  // State to manage the current screen
  const [screen, setScreen] = useState<ScreenType>("allDiets");

  return (
    // Wrapping the entire app in the ThemeProvider to provide the theme context
    <ThemeProvider>
      <AppContent screen={screen} setScreen={setScreen} />
    </ThemeProvider>
  );
}

interface AppContentProps {
  screen: ScreenType;  // The current screen being displayed
  setScreen: React.Dispatch<React.SetStateAction<ScreenType>>;  // Function to change the screen
}

function AppContent({ screen, setScreen }: AppContentProps) {
  // Accessing the styles from the theme context
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      {/* Conditional rendering of screens based on the current screen state */}
      {screen === "allActivities" && (
        <AllActivities 
          screen={screen}  // Passing the current screen as a prop
          onAdd={() => setScreen("addActivity")}  // Function to navigate to add activity screen
          onGoToDiets={() => setScreen("allDiets")}  // Function to navigate to diets screen
          onGoToSettings={() => setScreen("settings")}  // Function to navigate to settings screen
        />
      )}

      {screen === "addActivity" && (
        <AddActivity 
          onBack={() => setScreen("allActivities")}  // Go back to activities screen
          onSave={() => setScreen("allActivities")}  // Save and return to activities screen
          onGoToSettings={() => setScreen("settings")}  // Go to settings screen
        />
      )}

      {screen === "allDiets" && (
        <AllDiets  
          screen={screen}  // Passing the current screen as a prop
          onAdd={() => setScreen("addDiet")}  // Navigate to add diet screen
          onGoToActivities={() => setScreen("allActivities")}  // Go to activities screen
          onGoToSettings={() => setScreen("settings")}  // Go to settings screen
        />
      )}

      {screen === "addDiet" && (
        <AddDiet 
          onBack={() => setScreen("allDiets")}  // Go back to diets screen
          onSave={() => setScreen("allDiets")}  // Save and return to diets screen
          onGoToSettings={() => setScreen("settings")}  // Go to settings screen
        />
      )}

      {screen === "settings" && (
        <Settings 
          onGoToDiets={() => setScreen("allDiets")}  // Go to diets screen
          onGoToActivities={() => setScreen("allActivities")}  // Go to activities screen
          onGoToSettings={() => setScreen("settings")}  // Stay in settings screen
        />
      )}
    </View>
  );
}
