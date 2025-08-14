import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '@/constants/tokens';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last updated: January 14, 2025</Text>
        
        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect minimal information necessary to provide our service: email address, 
          username, and trading activity data. We never collect or store your private keys.
        </Text>

        <Text style={styles.heading}>2. How We Use Information</Text>
        <Text style={styles.paragraph}>
          Your information is used to provide and improve our service, send important updates, 
          and ensure security and compliance.
        </Text>

        <Text style={styles.heading}>3. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement industry-standard security measures to protect your data. Private keys 
          are encrypted and stored only on your device.
        </Text>

        <Text style={styles.heading}>4. Third-Party Services</Text>
        <Text style={styles.paragraph}>
          We use Stripe for payment processing. We do not share your personal information with 
          third parties for marketing purposes.
        </Text>

        <Text style={styles.heading}>5. Your Rights</Text>
        <Text style={styles.paragraph}>
          You have the right to access, update, or delete your personal information. Contact 
          support for assistance with data requests.
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