import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { Spacing } from "../constants/styles";

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]} testID="settings-view">
      {/* Modified line below */}
      <Text style={{ ...styles.header, color: theme.text }} testID="settings">
        Settings
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
  },
  header: {
    fontSize: 24,
    marginBottom: Spacing.large,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Settings;
