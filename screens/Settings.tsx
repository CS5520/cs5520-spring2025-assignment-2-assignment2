import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "../components/ThemeContext";

interface SettingsProps {
  onGoToActivities: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
}
export default function Settings ({onGoToActivities, onGoToDiets, onGoToSettings}:SettingsProps ) {
  const { toggleTheme, styles } = useTheme();


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
      <Button title="Change Theme" onPress={toggleTheme} />
    </View>
  );
};
