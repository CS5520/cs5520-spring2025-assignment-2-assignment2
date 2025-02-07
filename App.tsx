import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import AddActivity from './screens/AddActivity'
import AllActivities from './screens/AllActivities'
import AllDiets from './screens/AllDiets';
import AddDiet from './screens/AddDiet';
import Settings from './screens/Settings';
import colours from './constants/styles';
import { ThemeContext, ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [screen, setScreen] = useState<"activities" | "diets" | "addActivity" | "addDiet" | "settings">("diets");
  const {theme} = useContext(ThemeContext);

  function handleOnSave(screen: "activities" | "diets") {
    setScreen(screen);
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <View style={styles.buttonContainer}>
          <Button 
            title="Activities" 
            onPress={() => setScreen('activities')} 
            color={screen === "activities" ? colours.blueButton : colours.whiteButton}
          />
          <Button 
            title="Diets" 
            onPress={() => setScreen('diets')} 
            color={screen === "diets" ? colours.blueButton : colours.whiteButton}
          />
        </View>
        <View style={styles.button}>
          <Button title="Settings" onPress={() => setScreen('settings')} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {screen === "activities" && <AllActivities onAdd={() => setScreen("addActivity")} />}
        {screen === "addActivity" && <AddActivity onSave={() => handleOnSave("activities")} />}
        {screen === "diets" && <AllDiets onAdd={() => setScreen("addDiet")} />}
        {screen === "addDiet" && <AddDiet onSave={() => handleOnSave("diets")} />}
        {screen === "settings" && <Settings />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 30,
    backgroundColor: colours.topBackground,
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: 'row',
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
  },
  bottomContainer: {
    flex: 8,
    // padding: 20,
    // backgroundColor: colours.lightBackground,
  },
})