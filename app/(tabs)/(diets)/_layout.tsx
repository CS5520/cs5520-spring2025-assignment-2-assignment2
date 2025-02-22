import PressableButton from '@/components/PressableButton';
import colours from '@/constants/styles';
import { ThemeContext } from '@/ThemeContext';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Alert } from 'react-native';
import { deleteFromDB, updateDB } from '@/firebase/firestore';

export default function DietsLayout() {
  const {theme} = useContext(ThemeContext);  
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: theme.navigationBackgroundColor},
        headerTintColor: theme.navigationTextColor,
      }}
    >      
      <Stack.Screen name="index" options={{ title: "Diets"}}/>
      <Stack.Screen name="AddDiet" options={{ title: "Add Diet"}}/>
      <Stack.Screen name="EditDiet" options={{ title: "Edit"}}/>
    </Stack>
  );
}
