import { router, Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colours from "@/constants/styles";
import { Pressable } from 'react-native';
import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '@/ThemeContext';

export default function TabLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerStyle: {backgroundColor: theme.navigationBackgroundColor},
        headerTintColor: theme.navigationTextColor,
        tabBarStyle: {backgroundColor: theme.navigationBackgroundColor},
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: theme.navigationTextColor,
      }}
    >
      <Tabs.Screen 
        name="(diets)" 
        options={{
          headerShown: false,
          title: "Diets",
          tabBarIcon: ({color}) => (
            <Ionicons name="fast-food-outline" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="(activities)" 
        options={{
          headerShown: false,
          title: "Activities",
          tabBarIcon: ({color}) => (
            <Ionicons name="bicycle" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="Settings" 
        options={{ 
          title: "Settings",
          tabBarIcon: ({color}) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
