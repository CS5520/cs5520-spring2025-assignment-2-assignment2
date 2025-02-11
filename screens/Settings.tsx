import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "../components/ThemeSwitch";
import { buttonColors } from "@/constants/colors";

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
      <Button title="Diets"  onPress={onGoToDiets} color={buttonColors.primary}/>
      <Button title="Activities" onPress={onGoToActivities} color={buttonColors.primary} />
      </View>
      <Button title="Settings" onPress={onGoToSettings} color={buttonColors.primary}/>
      </View>
      <Text style={styles.title} testID="settings">Settings</Text>
      <Button title="toggle theme" onPress={toggleTheme} color={buttonColors.primary}/>
    </View>
  );
};
