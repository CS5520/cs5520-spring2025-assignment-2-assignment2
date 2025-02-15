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

      <View style={styles.buttonContainer}>

        <Button
          title="Toggle Theme"
          onPress={toggleTheme}
        />
      </View>

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
  buttonContainer: {
    alignSelf: 'center',
  }
});

export default Settings;