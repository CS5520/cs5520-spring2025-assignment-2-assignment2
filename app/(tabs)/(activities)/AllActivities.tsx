import { StyleSheet, Text, View, Button } from "react-native";
import ItemsList from "@/components/ItemsList";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/ThemeContext";
import { router, Stack, useFocusEffect, useNavigation } from "expo-router";
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from "@/constants/styles";
import PressableButton from "@/components/PressableButton";


export default function AllActivities() {
  const {theme} = useContext(ThemeContext);

  function handleAdd() {
    router.push("/AddActivity");
  }

  
  return (
    <View testID="all-activities-view" style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Stack.Screen 
        options={{ 
          headerRight: () => (
            <PressableButton 
              pressedInHandler={handleAdd}>
              <Ionicons name="add" size={24} color={theme.navigationTextColor} />
            </PressableButton>
          ),
        }}
      />
      <ItemsList type="activities"/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
  },
  topContainer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 30,
    backgroundColor: colours.topBackground,
  },

});
