import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { CheckCircle } from 'lucide-react-native';

export default function TermsScreen() {
  const router = useRouter();
  const { acceptTerms, state } = useApp();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    acceptTerms();
    router.replace('/(onboarding)/how-it-works');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.subtitle}>Please review and accept to continue</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Points</Text>
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <CheckCircle size={16} color={colors.green} />
              <Text style={styles.bulletText}>
                MoneyPrinter provides automated trading tools for user-owned wallets
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <CheckCircle size={16} color={colors.green} />
              <Text style={styles.bulletText}>
                We never store your private keys on our servers
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <CheckCircle size={16} color={colors.green} />
              <Text style={styles.bulletText}>
                Trading cryptocurrency involves significant risk
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <CheckCircle size={16} color={colors.green} />
              <Text style={styles.bulletText}>
                Past performance does not guarantee future results
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <CheckCircle size={16} color={colors.green} />
              <Text style={styles.bulletText}>
                You must be 18 years or older to use this service
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.legalText}>
          <Text style={styles.legalParagraph}>
            By using MoneyPrinter, you acknowledge that you understand and accept the risks 
            associated with cryptocurrency trading. The service is provided "as is" without 
            warranties of any kind.
          </Text>
          <Text style={styles.legalParagraph}>
            You are solely responsible for your trading decisions and any resulting gains 
            or losses. MoneyPrinter does not provide financial advice or act as a broker.
          </Text>
        </View>

        <View style={styles.links}>
          <Button
            title="View Full Terms of Service"
            variant="ghost"
            size="small"
            onPress={() => router.push('/terms')}
          />
          <Button
            title="View Privacy Policy"
            variant="ghost"
            size="small"
            onPress={() => router.push('/privacy')}
          />
          <Button
            title="View Risk Disclosure"
            variant="ghost"
            size="small"
            onPress={() => router.push('/risk')}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.agreement}>
          <Switch
            value={agreed}
            onValueChange={setAgreed}
            trackColor={{ false: colors.border, true: colors.green }}
            thumbColor={colors.text}
            testID="terms_checkbox"
          />
          <Text style={styles.agreementText}>
            I agree to the Terms of Service, Privacy Policy, and Risk Disclosure
          </Text>
        </View>
        <Button
          title="Continue"
          variant="primary"
          size="large"
          disabled={!agreed}
          onPress={handleContinue}
          testID="continue_button"
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
  header: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(2),
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing(6),
  },
  section: {
    marginBottom: spacing(6),
  },
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(4),
  },
  bulletPoints: {
    gap: spacing(3),
  },
  bulletPoint: {
    flexDirection: 'row',
    gap: spacing(3),
  },
  bulletText: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 22,
  },
  legalText: {
    marginBottom: spacing(6),
  },
  legalParagraph: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing(4),
  },
  links: {
    gap: spacing(2),
    marginBottom: spacing(4),
  },
  footer: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3),
    marginBottom: spacing(4),
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.sm,
  },
  agreementText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
});