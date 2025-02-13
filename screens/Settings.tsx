import { View, Text, StyleSheet, Button } from "react-native";
import { styles } from "../constants/styles";
import { useTheme } from "../ThemeContext";

const Settings = () => {
  const { themeStyles, toggleTheme } = useTheme();

  return (
    <View
      testID="settings-view"
      style={styles.content}
    >
      <Text
        testID="settings"
        style={[styles.title, { color: themeStyles.textColor }]}
      >
        Settings
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default Settings;
