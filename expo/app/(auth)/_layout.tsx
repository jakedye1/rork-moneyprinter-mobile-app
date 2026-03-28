import { Stack } from 'expo-router';
import { colors } from '@/constants/tokens';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        contentStyle: {
          backgroundColor: colors.bg,
        },
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Sign In' }} />
      <Stack.Screen name="register" options={{ title: 'Create Account' }} />
      <Stack.Screen name="terms" options={{ title: 'Terms & Conditions' }} />
    </Stack>
  );
}