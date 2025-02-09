import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

interface SettingsProps {
  onGoToActivities: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
}
export default function Settings ({onGoToActivities, onGoToDiets, onGoToSettings}:SettingsProps ) {
  const [theme, setTheme] =  useState("light");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <View style={styles.container} testID="settings-view">
      <View style={styles.header}>
          <View style={styles.switchButton}>
      <Button title="Diets"  onPress={onGoToDiets}/>
      <Button title="Activities" onPress={onGoToActivities} />
      </View>
      <Button title="Settings" onPress={onGoToSettings} />
      </View>
      <Text style={styles.title} testID="settings">Settings</Text>
      <Button title="Change Theme" onPress={handleThemeChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'grey',
    paddingTop: 0,
    width:'100%'
  },
  switchButton:{
    marginTop:45,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  addButton: {
    marginVertical: 20,
  }
});



