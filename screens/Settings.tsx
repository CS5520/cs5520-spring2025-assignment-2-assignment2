import { View, Text, StyleSheet, Button,  } from "react-native";
import { ThemeContext } from "@/ThemeContext";
import  { useContext } from "react";
import { 
  color, 
  commonTitleStyles, 
  commonButtonContainerStyles
} from "@/constants/styles";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View 
      testID="settings-view" 
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text
       testID="settings" 
       style={[commonTitleStyles.title, styles.title, { color: theme.textColor }]}
      >
      Settings
      </Text>
      <View style={commonButtonContainerStyles.buttonContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primaryColor,
    flex: 1,
  },
  title: {
    marginBottom: 30,
  }, 
});

export default Settings;

