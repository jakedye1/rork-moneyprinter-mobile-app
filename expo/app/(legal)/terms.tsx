import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '@/constants/tokens';

export default function TermsOfServiceScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last updated: January 14, 2025</Text>
        
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using MoneyPrinter, you agree to be bound by these Terms of Service.
        </Text>

        <Text style={styles.heading}>2. Service Description</Text>
        <Text style={styles.paragraph}>
          MoneyPrinter provides automated cryptocurrency trading tools for user-owned wallets. 
          We do not act as a broker, dealer, or financial advisor.
        </Text>

        <Text style={styles.heading}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You are solely responsible for your trading decisions and any resulting gains or losses. 
          You must be at least 18 years old to use our service.
        </Text>

        <Text style={styles.heading}>4. Risk Disclosure</Text>
        <Text style={styles.paragraph}>
          Cryptocurrency trading involves significant risk. You may lose all invested capital. 
          Past performance does not guarantee future results.
        </Text>

        <Text style={styles.heading}>5. Privacy and Security</Text>
        <Text style={styles.paragraph}>
          We never store your private keys on our servers. Keys are encrypted and stored locally 
          on your device using secure enclave technology.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing(6),
  },
  lastUpdated: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginBottom: spacing(6),
  },
  heading: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginTop: spacing(6),
    marginBottom: spacing(3),
  },
  paragraph: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing(4),
  },
});