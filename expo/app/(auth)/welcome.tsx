import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing } from '@/constants/tokens';
import { Shield } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Shield size={48} color={colors.green} />
          </View>
          <Text style={styles.brand}>MoneyPrinter</Text>
          <Text style={styles.motto}>
            Print money while you sleep
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Sign In"
            variant="primary"
            size="large"
            onPress={() => router.push('/login')}
            testID="welcome_signin_btn"
          />
          <Button
            title="Create Account"
            variant="secondary"
            size="large"
            onPress={() => router.push('/register')}
            testID="welcome_register_btn"
          />
          <Button
            title="How it works"
            variant="ghost"
            onPress={() => router.push('/terms')}
            testID="learn_button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing(6),
    justifyContent: 'center',
    paddingVertical: spacing(8),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing(12),
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(6),
    borderWidth: 2,
    borderColor: colors.green,
  },

  brand: {
    fontSize: 42,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.green,
    marginBottom: spacing(3),
  },
  motto: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: fonts.weights.medium,
  },

  actions: {
    gap: spacing(3),
  },
});