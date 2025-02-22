import colours from '@/constants/styles';
import { ThemeContext } from '@/ThemeContext';
import { Stack } from 'expo-router';
import { useContext } from 'react';

export default function ActivitiesLayout() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: theme.navigationBackgroundColor},
        headerTintColor: theme.navigationTextColor,
      }}
    >      
      <Stack.Screen name="AllActivities" options={{title: "Activities"}}/>
      <Stack.Screen name="AddActivity" options={{title: "Add Activity"}}/>
      <Stack.Screen name="EditActivity" options={{title: "Edit"}}/>
    </Stack>
  );
}