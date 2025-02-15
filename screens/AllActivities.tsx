import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ItemsList from "../components/ItemsList";
import { useState } from "react";
import AddActivity from "./AddActivity";
import { useTheme } from "../ThemeContext";



export default function AllActivities() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const { theme } = useTheme();
  
  const openAddActivity = () => {
    setShowAddActivity(true);
};

const closeAddActivity = () => {
    setShowAddActivity(false);
};



  return (
    <View testID="all-activities-view" style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="all-activities" style = {[styles.header, { color: theme.textColor }]}>All Activities</Text>
      <TouchableOpacity style={styles.button} onPress={openAddActivity}>
                <Text style={styles.buttonText}>Add Diets</Text>
      </TouchableOpacity>
      <ItemsList type="activity" openAdd={openAddActivity} />
      {showAddActivity && <AddActivity closedActivity={closeAddActivity} />}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",  
    alignSelf: "center",
},
button: {
  backgroundColor: "#007BFF",
  padding: 10,
  borderRadius: 5,
  alignItems: "center",
  marginBottom: 10,
},
buttonText: {
  color: "#fff",
  fontSize: 16,
},
});
