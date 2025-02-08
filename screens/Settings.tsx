import { View, Text, StyleSheet, Button } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

const Settings = () => {
  const { BGColor, TXTColor, toggleTheme } = useContext(ThemeContext);
  return (
    <View testID="settings-view" style={{ backgroundColor: BGColor }}>
      <Text testID="settings" style={{ color: TXTColor }}>
        Settings
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
