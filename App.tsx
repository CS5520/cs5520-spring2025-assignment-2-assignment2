import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
} from "react-native";

import AllActivities from "./screens/AllActivities";
import AllDiets from "./screens/AllDiets";
import AddActivity from "./screens/AddActivity";
import AddDiet from "./screens/AddDiet";
import Settings from "./screens/Settings";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { Colors, Spacing } from "./constants/styles";

type Screen = "activities" | "settings" | "diets" | "addActivity" | "addDiet";

function AppInner() {
  const [screen, setScreen] = useState<Screen>("diets");
  const { theme } = useTheme();

  const onAdd = () => {
    if (screen === "activities") {
      setScreen("addActivity");
    } else if (screen === "diets") {
      setScreen("addDiet");
    }
  };

  let content;
  switch (screen) {
    case "activities":
      content = <AllActivities onAdd={onAdd} />;
      break;
    case "settings":
      content = <Settings />;
      break;
    case "diets":
      content = <AllDiets onAdd={onAdd} />;
      break;
    case "addActivity":
      content = <AddActivity onSave={() => setScreen("activities")} />;
      break;
    case "addDiet":
      content = <AddDiet onSave={() => setScreen("diets")} />;
      break;
    default:
      content = <AllDiets onAdd={onAdd} />;
  }

  const getNavStyle = (target: Screen): TextStyle => ({
    color: screen === target ? theme.navBarText : Colors.secondary,
    fontWeight: "600" as "600",
    fontSize: 16,
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.navBarBackground }]}>
      <View style={[styles.topRow, { backgroundColor: theme.navBarBackground }]}>
        <TouchableOpacity onPress={() => setScreen("activities")}>
          <Text style={getNavStyle("activities")}>Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("diets")}>
          <Text style={getNavStyle("diets")}>Diets</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.settingsRow, { backgroundColor: theme.navBarBackground }]}>
        <TouchableOpacity
          onPress={() => setScreen("settings")}
        >
          <Text style={getNavStyle("settings")}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {content}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  settingsRow: {
    alignItems: "center",
    paddingVertical: 8,
  },
});