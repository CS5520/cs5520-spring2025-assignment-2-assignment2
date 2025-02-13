import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import AllActivities from './screens/AllActivities'
import AllDiets from './screens/AllDiets'
import Settings from './screens/Settings'
import { styles } from './constants/styles'
import { writeToDB } from './firebase/firestore'
import AddActivity from './screens/AddActivity'
import AddDiet from './screens/AddDiet'

const App = () => {

  enum Screen {
    DIETS = 'diets',
    ACTIVITIES = 'activities',
    SETTINGS = 'settings',
    ADD_ACTIVITY = 'addActivity',
    ADD_DIET = 'addDiet'
  }

  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DIETS)

  const handleAddActivity = () => {
    setCurrentScreen(Screen.ADD_ACTIVITY)
  }

  const handleAddDiet = () => {
    setCurrentScreen(Screen.ADD_DIET)
  }

  const handleFinishAddActivity = () => {
    setCurrentScreen(Screen.ACTIVITIES)
  }

  const handleFinishAddDiet = () => {
    setCurrentScreen(Screen.DIETS)
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.toggleButtons}>
          <Button
            title="Activities"
            color={
              currentScreen === Screen.ACTIVITIES
                ? styles.activeButton.color
                : styles.inactiveButton.color
            }
            onPress={() => {
              setCurrentScreen(Screen.ACTIVITIES);
            }}
          />
          <Button
            title="Diets"
            color={
              currentScreen === Screen.DIETS
                ? styles.activeButton.color
                : styles.inactiveButton.color
            }
            onPress={() => {
              setCurrentScreen(Screen.DIETS);
            }}
          />
        </View>
        <View style={styles.settingsButton}>
          <Button
            title="Settings"
            onPress={() => {
              setCurrentScreen(Screen.SETTINGS);
            }}
          />
        </View>
      </View>

      {currentScreen === Screen.DIETS && <AllDiets onAdd={handleAddDiet} />}
      {currentScreen === Screen.ACTIVITIES && <AllActivities onAdd={handleAddActivity} />}
      {currentScreen === Screen.SETTINGS && <Settings />}
      {currentScreen === Screen.ADD_ACTIVITY && <AddActivity onSave={handleFinishAddActivity} />}
      {currentScreen === Screen.ADD_DIET && <AddDiet onSave={handleFinishAddDiet} />}
    </View>
  );
}

export default App