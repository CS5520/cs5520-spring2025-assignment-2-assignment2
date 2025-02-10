import ItemList from "../components/ItemsList";
import { Button, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../constants/ThemeContext";
interface AllActivitiesProps {
  onAdd: () => void;
  onGoToActivities: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToActivities, onGoToSettings }: AllActivitiesProps) {
  const { styles } = useTheme(); 

  return (
    <View style={styles.container} testID="all-diets-view">
      <View style={styles.header}>
          <View style={styles.switchButton}>
      <Button title="Diets"  disabled={true}/>
      <Button title="Activities" onPress={onGoToActivities} />
      </View>
      <Button title="Settings" onPress={onGoToSettings} />
      </View>
      <Text style={styles.title} testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} />
      <ItemList type="diet" />
    </View>
  );
}


