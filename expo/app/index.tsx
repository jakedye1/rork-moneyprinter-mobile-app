import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/store/app-store';
import { colors, fonts } from '@/constants/tokens';

export default function SplashScreen() {
  const router = useRouter();
  const { state } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.isOnboarded) {
        router.replace('/(tabs)');
      } else if (state.hasAcceptedTerms) {
        router.replace('/(onboarding)/how-it-works');
      } else {
        router.replace('/(auth)/welcome');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, state]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MoneyPrinter</Text>
      <Text style={styles.tagline}>Automated crypto trading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 42,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.green,
    marginBottom: 8,
  },
  tagline: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
});