import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import AllActivities from "./screens/AllActivities";
import AddActivity from "./screens/AddActivity";
import AllDiets from "./screens/AllDiets";
import AddDiet from "./screens/AddDiet";
import Settings from "./screens/Settings";
import { ThemeProvider } from "./constants/ThemeContext"; 

export default function App() {
  const [screen, setScreen] = useState<"allActivities" | "addActivity" | "allDiets" | "addDiet" | "settings">("allActivities");

  return (
    <View style={styles.container}>
      {screen === "allActivities" && (
        <AllActivities onAdd={() => setScreen("addActivity")} onGoToDiets={() => setScreen("allDiets")} onGoToSettings={() => setScreen("settings")} />
      )}
      {screen === "addActivity" && <AddActivity onBack={() => setScreen("allActivities")} onSave={() => setScreen("allActivities")} onGoToSettings={() => setScreen("settings")} />}
      {screen === "allDiets" && <AllDiets onAdd={() => setScreen("addDiet")} onGoToActivities={() => setScreen("allActivities")} onGoToSettings={() => setScreen("settings")} />}
      {screen === "addDiet" && <AddDiet onBack={() => setScreen("allDiets")} onSave={() => setScreen("allDiets")} onGoToSettings={() => setScreen("settings")} />}
      {screen === "settings" && <Settings onGoToDiets={() => setScreen("allDiets")} onGoToActivities={() => setScreen("allActivities")} onGoToSettings={() => setScreen("settings")} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
