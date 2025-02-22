import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/ThemeContext";
import PressableButton from "@/components/PressableButton";
import colours from "@/constants/styles";

const Settings = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <View testID="settings-view" style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.button}>
        <PressableButton
          pressedInHandler={toggleTheme}
          componentStyle={[styles.pressableButton, {backgroundColor: theme.navigationBackgroundColor}]}
        >
          <Text style={[styles.themeButton, {color: theme.navigationTextColor}]}>Toggle Theme</Text>
        </PressableButton>
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
  pressableButton: {
    backgroundColor: colours.darkBackground,
    padding: 10,
    borderRadius: 5,
  },
  themeButton: {
    color: colours.lightText,
  },

});

export default Settings;
