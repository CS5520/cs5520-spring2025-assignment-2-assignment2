
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ItemsList from "../components/ItemsList";
import { useState } from "react";
import AddActivity from "./AddActivity";
import { useTheme } from "../ThemeContext";
import { ThemeContext } from"../ThemeContext"
import { useContext } from "react";
import {styles} from "../constants/styles";



export default function AllActivities() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const { theme } = useContext(ThemeContext);
  
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
                <Text style={styles.buttonText}>Add Activites</Text>
      </TouchableOpacity>
      <ItemsList type="activity" openAdd={openAddActivity} />
      {showAddActivity && <AddActivity onSave={closeAddActivity} />}
    </View>
  );
}



