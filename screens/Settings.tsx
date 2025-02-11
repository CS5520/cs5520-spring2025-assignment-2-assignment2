import { View, Text, StyleSheet, Button } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import styles from "../constants/styles";
/**
 * Settings Component
 * Provides a button to toggle between light and dark themes
 */
const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <View
      testID="settings-view"
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
        testID="settings"
        style={[styles.title, { color: theme.textColor }]}
      >
        Settings
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
};

export default Settings;
