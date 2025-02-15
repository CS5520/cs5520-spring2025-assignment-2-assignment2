import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "../ThemeContext"; // 引入 ThemeContext

const Settings = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Settings</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Settings;
