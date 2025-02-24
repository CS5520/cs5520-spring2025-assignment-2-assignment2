
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ItemsList from "../components/ItemsList";
import { useState } from "react";
import AddDiet from "./AddDiet";
import { useTheme } from "../ThemeContext";
import { ThemeContext } from"../ThemeContext"
import { useContext } from "react";
import {styles} from "../constants/styles";



export default function AllActivities() {
      const [showAddDiet, setShowAddDiet] = useState(false);
      const { theme } = useContext(ThemeContext);

      const openAddDiet = () => {
        setShowAddDiet(true);
    };

    const closeAddDiet = () => {
      setShowAddDiet(false);
  };


      

  return (
    <View testID="all-diets-view" style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="all-diets" style = {[styles.header, { color: theme.textColor }]}>All Diets</Text>

      <TouchableOpacity style={styles.button} onPress={openAddDiet}>
          <Text style={styles.buttonText}>Add Diets</Text>
      </TouchableOpacity>
      
      <ItemsList type="diet" openAdd={openAddDiet} />
      {showAddDiet && <AddDiet onSave={closeAddDiet} />}
    </View>
  );
}





