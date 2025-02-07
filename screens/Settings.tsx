import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";

const Settings = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <View testID="settings-view" style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="settings" style={[styles.title, {color: theme.textColor} ]}>
        Settings
      </Text>
      <View style={styles.button}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
  },

});

export default Settings;
