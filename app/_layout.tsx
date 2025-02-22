import colours from '@/constants/styles';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      </Stack>
    </ThemeProvider>
  );
}
