import { View, Text, StyleSheet, Alert, Button, TextInput, Platform, TouchableOpacity } from "react-native";
import { Timestamp } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { writeToDB } from "@/firebase/firestore";
import colours from "@/constants/styles";
import { ThemeContext } from "@/ThemeContext";
import { router, Stack, useNavigation } from "expo-router";
import PressableButton from "@/components/PressableButton";
import { Ionicons } from '@expo/vector-icons';
import DietForm, { Diet } from "@/components/DietForm";


export default function AddDiet() {
  const {theme} = useContext(ThemeContext);

  async function handleAddSave(newDiet: Diet) {
    try {
      await writeToDB("diets", newDiet);
      router.back();
    } catch (error) {
      console.error("Error writing document: ", error); 
    }
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerRight: () => (
            <PressableButton 
              pressedInHandler={()=>router.back()}>
              <Ionicons name="trash-outline" size={24} color={theme.navigationTextColor} />
            </PressableButton>
          ),
        }}
      />
      <DietForm addSaveHandler={handleAddSave}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colours.darkBackground,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
    height: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

});
