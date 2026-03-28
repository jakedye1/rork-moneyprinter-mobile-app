import { Stack } from 'expo-router';
import { colors } from '@/constants/tokens';

export default function OnboardingLayout() {
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
      <Stack.Screen name="how-it-works" options={{ title: 'How It Works' }} />
      <Stack.Screen name="manage-key" options={{ title: 'Wallet Security' }} />
      <Stack.Screen name="risk-disclosure" options={{ title: 'Risk Disclosure' }} />
      <Stack.Screen name="add-key" options={{ title: 'Connect Wallet' }} />
      <Stack.Screen name="subscription" options={{ title: 'Get Started' }} />
    </Stack>
  );
}