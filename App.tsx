import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import AllActivities from './screens/AllActivities'
import AllDiets from './screens/AllDiets'
import Settings from './screens/Settings'
import { styles } from './constants/styles'
import { writeToDB } from './firebase/firestore'

const App = () => {

  const [currentScreen, setCurrentScreen] = useState('diets')
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.toggleButtons}>
          <Button
            title="Activities"
            color={
              currentScreen === "activities"
                ? styles.activeButton.color
                : styles.inactiveButton.color
            }
            onPress={() => {
              setCurrentScreen("activities");
            }}
          />
          <Button
            title="Diets"
            color={
              currentScreen === "diets"
                ? styles.activeButton.color
                : styles.inactiveButton.color
            }
            onPress={() => {
              setCurrentScreen("diets");
            }}
          />
        </View>
        <View style={styles.settingsButton}>
          <Button
            title="Settings"
            onPress={() => {
              setCurrentScreen("settings");
            }}
          />
        </View>
      </View>

      {currentScreen === "diets" && <AllDiets onAdd={() => {}} />}
      {currentScreen === "activities" && <AllActivities onAdd={() => {}} />}
      {currentScreen === "settings" && <Settings />}
    </SafeAreaView>
  );
}

export default App