import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ItemsList from "@/components/ItemsList";
import React, { useCallback, useContext, useEffect } from "react";
import { ThemeContext } from "@/ThemeContext";
import { router, Stack, useFocusEffect, useNavigation } from "expo-router";
import colours from "@/constants/styles";
import PressableButton from "@/components/PressableButton";


export default function AllDiets() {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();

  function handleAdd() {
    router.push("/AddDiet");
  }
    
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton 
          pressedInHandler={handleAdd}>
          <Ionicons name="add" size={24} color={theme.navigationTextColor} />
        </PressableButton>
      ),
      headerRightContainerStyle: {
        paddingRight: 15,
      },
    });
  }, [navigation, theme]);


  return (
    <View testID="all-diets-view" style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ItemsList type="diets" />
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
});
