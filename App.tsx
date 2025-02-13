import React, { useState } from "react";
import { View, Button } from "react-native";
import AllActivities from "./screens/AllActivities";
import AllDiets from "./screens/AllDiets";
import Settings from "./screens/Settings";
import { styles } from "./constants/styles";
import { ThemeProvider, useTheme } from "./ThemeContext";
import AddActivity from "./screens/AddActivity";
import AddDiet from "./screens/AddDiet";

const AppContent = () => {
  enum Screen {
    DIETS = "diets",
    ACTIVITIES = "activities",
    SETTINGS = "settings",
    ADD_ACTIVITY = "addActivity",
    ADD_DIET = "addDiet",
  }

  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DIETS);
  const { themeStyles } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <View style={styles.navBar}>
        <View style={styles.toggleButtons}>
          <Button
            title="Activities"
            color={
              currentScreen === Screen.ACTIVITIES
                ? styles.activeButton.color
                : styles.inactiveButton.color
            }
            onPress={() => setCurrentScreen(Screen.ACTIVITIES)}
          />
          <Button
            title="Diets"
            color={
              currentScreen === Screen.DIETS
                ? styles.activeButton.color
                : styles.inactiveButton.color
            }
            onPress={() => setCurrentScreen(Screen.DIETS)}
          />
        </View>
        <View style={styles.settingsButton}>
          <Button
            title="Settings"
            onPress={() => setCurrentScreen(Screen.SETTINGS)}
          />
        </View>
      </View>

      {currentScreen === Screen.DIETS && (
        <AllDiets onAdd={() => setCurrentScreen(Screen.ADD_DIET)} />
      )}
      {currentScreen === Screen.ACTIVITIES && (
        <AllActivities onAdd={() => setCurrentScreen(Screen.ADD_ACTIVITY)} />
      )}
      {currentScreen === Screen.SETTINGS && <Settings />}
      {currentScreen === Screen.ADD_ACTIVITY && (
        <AddActivity onSave={() => setCurrentScreen(Screen.ACTIVITIES)} />
      )}
      {currentScreen === Screen.ADD_DIET && (
        <AddDiet onSave={() => setCurrentScreen(Screen.DIETS)} />
      )}
    </View>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
