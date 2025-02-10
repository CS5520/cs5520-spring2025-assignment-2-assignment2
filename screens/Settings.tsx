import { View, Text, StyleSheet, Button } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import styles from "../constants/styles";

const Settings = () => {
  const { BGColor, TXTColor, toggleTheme } = useContext(ThemeContext);
  return (
    <View
      testID="settings-view"
      style={[styles.container, { backgroundColor: BGColor }]}
    >
      <Text testID="settings" style={[styles.title, { color: TXTColor }]}>
        Settings
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
};

export default Settings;
