import { View, Text, StyleSheet, Button } from "react-native";
import { styles } from "../constants/styles";

const Settings = () => {
  return (
    <View testID="settings-view" style={styles.content}>
      <Text testID="settings" style={styles.title}>
        Settings
      </Text>
    </View>
  );
};

export default Settings;
