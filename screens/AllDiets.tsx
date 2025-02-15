import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ItemsList from "../components/ItemsList";
import { useState } from "react";
import AddDiet from "./AddDiet";
import { useTheme } from "../ThemeContext";



export default function AllActivities() {
      const [showAddDiet, setShowAddDiet] = useState(false);
      const { theme } = useTheme();

      const openAddDiet = () => {
        setShowAddDiet(true);
    };

    const closeAddDiet = () => {
      setShowAddDiet(false);
  };


      

  return (
    <View testID="all-diets-view" style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text testID="all-diets" style = {styles.header}>All Diets</Text>

      <TouchableOpacity style={styles.button} onPress={openAddDiet}>
          <Text style={styles.buttonText}>Add Diets</Text>
      </TouchableOpacity>
      
      <ItemsList type="diet" openAdd={openAddDiet} />
      {showAddDiet && <AddDiet closeddDiet={closeAddDiet} />}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",  
    alignSelf: "center",
    color: "#ccc"
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
