import { View, Text, StyleSheet, Alert, Button, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { writeToDB, deleteFromDB } from "@/firebase/firestore";
import colours from "@/constants/styles";
import { ThemeContext } from "@/ThemeContext";
import { router, Stack, useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import PressableButton from "@/components/PressableButton";
import ActivityForm, { Activity } from '@/components/ActivityForm'

export default function AddActivity() {
  const {theme} = useContext(ThemeContext);

  async function handleAddSave(newActivity: Activity) {
    try {
      await writeToDB("activities", newActivity);
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
      <ActivityForm addSaveHandler={handleAddSave}/>
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
