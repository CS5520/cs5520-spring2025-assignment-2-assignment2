import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ActivityForm, { Activity } from '@/components/ActivityForm'
import { onSnapshot, Timestamp } from 'firebase/firestore'
import { deleteFromDB, updateDB } from '@/firebase/firestore'
import { router, Stack, useLocalSearchParams, useNavigation } from 'expo-router'
import { ItemFromDB } from '@/components/ItemsList'
import PressableButton from '@/components/PressableButton'
import colours from '@/constants/styles'
import { Ionicons } from '@expo/vector-icons'
import { ThemeContext } from '@/ThemeContext'


export default function EditActivity() {
  const params = useLocalSearchParams(); 
  const { theme } = useContext(ThemeContext);

  const item: ItemFromDB = {
    id: params.id as string,
    value: params.value as string,
    title: params.title as string,
    isImportant: params.isImportant === 'true',
    date: Timestamp.fromDate(new Date(typeof(params.date) === "string"? params.date : "")),
  };

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
              await deleteFromDB(item.id, "activities");
              router.back();
            } catch (error) {
              console.error("Error deleting document: ", error);
            }
          }
        },
      ]
    );
  }

  async function handleEditSave(id: string, updatedActivity: Activity) {
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
              await updateDB(id, "activities", updatedActivity);
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
      <ActivityForm initialData={item} editSaveHandler={handleEditSave}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})