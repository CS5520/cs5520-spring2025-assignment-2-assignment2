import { View, SafeAreaView, Button, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import AllActivities from "./screens/AllActivities";
import AllDiet from "./screens/AllDiets";
import AddDiet from "./screens/AddDiet";
import AddActivity from "./screens/AddActivity";
import Settings from "./screens/Settings";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

const App = () => {
  const [screen, setScreen] = useState(1);
  const { BGColor } = useContext(ThemeContext);
  function addActivity() {
    console.log("add activity");
    setScreen(2);
  }

  function addDiet() {
    console.log("add diet");
    setScreen(3);
  }

  function back2Activity() {
    console.log("back to activity");
    setScreen(0);
  }

  function back2Diet() {
    console.log("back to diet");
    setScreen(1);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navigationContainer}>
          <Button
            title="Activities"
            color={screen === 0 ? "#007BFF" : "#CCC"}
            onPress={() => {
              setScreen(0);
            }}
          />
          <Button
            title="Diets"
            color={screen === 1 ? "#007BFF" : "#CCC"}
            onPress={() => {
              setScreen(1);
            }}
          />
        </View>
        <View style={styles.settingsContainer}>
          <Button
            title="Settings"
            onPress={() => {
              setScreen(4);
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <ThemeProvider>
          {screen === 1 ? <AllDiet onAdd={addDiet} /> : null}
          {screen === 0 ? <AllActivities onAdd={addActivity} /> : null}
          {screen === 3 ? <AddDiet onSave={back2Diet} /> : null}
          {screen === 2 ? <AddActivity onSave={back2Activity} /> : null}
          {screen === 4 ? <Settings /> : null}
        </ThemeProvider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
  },
  header: {
    marginTop: 30,
    backgroundColor: "#404040",
    gap: 20,
    padding: 16,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  settingsContainer: {
    alignItems: "center",
    //paddingVertical: 10,
  },
  content: {
    flex: 1,
    //marginTop: 20,
    //paddingHorizontal: 16,
  },
});

export default App;
