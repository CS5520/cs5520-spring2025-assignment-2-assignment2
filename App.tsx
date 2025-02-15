
import { StatusBar } from 'expo-status-bar';
import { Button, View, StyleSheet } from 'react-native';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';
import AllActivities from './screens/AllActivities';
import AllDiets from './screens/AllDiets';
import Settings from './screens/Settings';
import { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import { color, commonButtonContainerStyles } from './constants/styles';


export default function App() {
  const [screen, setScreen] = useState("AllDiets");

  return (
    <ThemeProvider>
      <View style={styles.container} >
        <StatusBar style="auto" />
        <View style={styles.topContainer}>
          <View style={styles.buttonContainer}>
              <Button 
                title="Activities" 
                onPress={() => setScreen("AllActivities")}
                color={screen === "AllActivities" ? color.blueish : color.whiteish}
              />
              <Button 
                title="Diets" 
                onPress={() => setScreen("AllDiets")} 
                color={screen === "AllDiets" ? color.blueish : color.whiteish} 
              />
          </View>
          <View style={commonButtonContainerStyles.buttonContainer}>
            <Button title="Settings" onPress={() => setScreen("Settings")} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {screen === "AllDiets" && < AllDiets onAdd={() => setScreen("AddDiet")} />}
          {screen === "AllActivities" && <AllActivities onAdd={() => setScreen("AddActivity")} />}
          {screen === "AddActivity" && <AddActivity onSave={() => setScreen("AllActivities")} />}
          {screen === "AddDiet" && <AddDiet onSave={() => setScreen("AllDiets")} />}
          {screen === "Settings" && <Settings />}
        </View>
        <View style={styles.footContainer}></View>
      </View>
    </ThemeProvider>   
  );
 
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: color.secondaryColor,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  bottomContainer: { 
    flex: 1,  
  },
  footContainer: {
    backgroundColor: color.secondaryColor,
    height: 25,
  },
});

