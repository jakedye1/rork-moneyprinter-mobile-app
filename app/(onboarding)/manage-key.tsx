import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { Lock, Shield, AlertTriangle, Key } from 'lucide-react-native';

export default function ManageKeyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Lock size={48} color={colors.green} />
          </View>
          <Text style={styles.title}>Managing Your Wallet Key</Text>
          <Text style={styles.subtitle}>
            Your security is our top priority
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Shield size={20} color={colors.green} />
          <Text style={styles.infoText}>
            Your private key is encrypted and stored locally in your device's Secure Enclave. 
            We never have access to it.
          </Text>
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Security Best Practices</Text>
          
          <View style={styles.tip}>
            <Key size={20} color={colors.cyan} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Never Share Your Key</Text>
              <Text style={styles.tipDescription}>
                Your private key is like a password to your wallet. Never share it with anyone.
              </Text>
            </View>
          </View>

          <View style={styles.tip}>
            <Shield size={20} color={colors.cyan} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Use Phantom Wallet</Text>
              <Text style={styles.tipDescription}>
                We recommend connecting via Phantom for the most secure experience.
              </Text>
            </View>
          </View>

          <View style={styles.tip}>
            <AlertTriangle size={20} color={colors.amber} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Backup Your Recovery Phrase</Text>
              <Text style={styles.tipDescription}>
                Store your wallet's recovery phrase in a safe place offline.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningCard}>
          <AlertTriangle size={20} color={colors.amber} />
          <Text style={styles.warningText}>
            If you lose access to your device, we cannot recover your wallet. 
            Make sure you have a backup of your recovery phrase.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="I Understand"
          variant="primary"
          size="large"
          onPress={() => router.push('/risk-disclosure')}
          testID="understand_button"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing(8),
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(4),
    borderWidth: 2,
    borderColor: colors.green,
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(2),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.green}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(3),
    marginBottom: spacing(6),
    borderWidth: 1,
    borderColor: `${colors.green}30`,
  },
  infoText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
  tips: {
    marginBottom: spacing(6),
  },
  tipsTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(4),
  },
  tip: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(3),
    marginBottom: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(1),
  },
  tipDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.amber}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(3),
    borderWidth: 1,
    borderColor: `${colors.amber}30`,
  },
  warningText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});