
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "../ThemeContext"; 
import {styles} from "../constants/styles";

const Settings = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <View testID="settings-view" style={[styles.container_setting, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="settings" style={[styles.text, { color: theme.textColor }]}>Settings</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />

    </View>
  );
};


export default Settings;
