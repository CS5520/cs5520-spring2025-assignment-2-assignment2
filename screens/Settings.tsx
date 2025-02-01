import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { TYPOGRAPHY, LAYOUT } from "../constants/styles";

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
      <Button
        title="Toggle Theme"
        onPress={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: LAYOUT.PADDING,
  },
  title: {
    ...TYPOGRAPHY.TITLE,
    textAlign: 'center',
    marginBottom: LAYOUT.MARGIN,
  },
});

export default Settings;