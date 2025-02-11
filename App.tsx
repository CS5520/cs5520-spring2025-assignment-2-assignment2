import React, { useState } from "react";
import { View } from "react-native";
import { ThemeProvider, useTheme } from "./components/ThemeSwitch";
import AllActivities from "./screens/AllActivities";
import AddActivity from "./screens/AddActivity";
import AllDiets from "./screens/AllDiets";
import AddDiet from "./screens/AddDiet";
import Settings from "./screens/Settings";

type ScreenType = "allActivities" | "addActivity" | "allDiets" | "addDiet" | "settings";

export default function App() {
  const [screen, setScreen] = useState<ScreenType>("allDiets");

  return (
    <ThemeProvider>
      <AppContent screen={screen} setScreen={setScreen} />
    </ThemeProvider>
  );
}

interface AppContentProps {
  screen: ScreenType;
  setScreen: React.Dispatch<React.SetStateAction<ScreenType>>;
}

function AppContent({ screen, setScreen }: AppContentProps) {
  const { styles } = useTheme();

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
