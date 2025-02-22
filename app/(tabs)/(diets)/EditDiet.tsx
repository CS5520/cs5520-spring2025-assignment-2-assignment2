import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { router, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import PressableButton from '@/components/PressableButton';
import { Ionicons } from '@expo/vector-icons';
import colours from '@/constants/styles';
import { deleteFromDB, updateDB } from '@/firebase/firestore';
import { ItemFromDB } from '@/components/ItemsList';
import { Timestamp } from 'firebase/firestore';
import DietForm, { Diet } from '@/components/DietForm';
import { ThemeContext } from '@/ThemeContext';


export default function EditDiet() {
  const params = useLocalSearchParams(); 
  const { theme } = useContext(ThemeContext);
  
  const item: ItemFromDB = {
    id: params.id as string,
    value: params.value as string,
    title: params.title as string,
    isImportant: params.isImportant === 'true',
    date: Timestamp.fromDate(new Date(typeof(params.date) === "string"? params.date : "")),
  };

  console.log("item: ", item);
  
  
  async function handleEditDelete() {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteFromDB(item.id, "diets");
              router.back();
            } catch (error) {
              console.error("Error deleting document: ", error);
            }
          }
        },
      ]
    );
  }
  
  async function handleEditSave(id: string, updatedDiet: Diet) {
    Alert.alert(
      "Important",
      "Are you sure you want to save these changes?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await updateDB(id, "diets", updatedDiet);
              router.back();
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          }
        },
      ]
    );
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerRight: () => (
            <PressableButton 
              pressedInHandler={handleEditDelete}>
              <Ionicons name="trash-outline" size={24} color={theme.navigationTextColor} />
            </PressableButton>
          ),
        }}
      />
      <DietForm initialData={item} editSaveHandler={handleEditSave}  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})