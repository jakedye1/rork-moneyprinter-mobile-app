import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { AlertTriangle, TrendingDown, Info } from 'lucide-react-native';

export default function RiskDisclosureScreen() {
  const router = useRouter();
  const { acceptRisk } = useApp();
  const [understood, setUnderstood] = useState(false);

  const handleContinue = () => {
    acceptRisk();
    router.push('/add-key');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <AlertTriangle size={48} color={colors.amber} />
          </View>
          <Text style={styles.title}>Risk Disclosure</Text>
          <Text style={styles.subtitle}>
            Important information about crypto trading
          </Text>
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Trading Risk Warning</Text>
          <Text style={styles.warningText}>
            Cryptocurrency trading carries a high level of risk and may not be suitable for all investors. 
            You could lose some or all of your invested capital.
          </Text>
        </View>

        <View style={styles.risks}>
          <View style={styles.riskItem}>
            <TrendingDown size={20} color={colors.red} />
            <View style={styles.riskContent}>
              <Text style={styles.riskTitle}>Market Volatility</Text>
              <Text style={styles.riskDescription}>
                Crypto markets are highly volatile. Prices can swing dramatically in minutes.
              </Text>
            </View>
          </View>

          <View style={styles.riskItem}>
            <AlertTriangle size={20} color={colors.amber} />
            <View style={styles.riskContent}>
              <Text style={styles.riskTitle}>No Guaranteed Returns</Text>
              <Text style={styles.riskDescription}>
                Past performance does not indicate future results. Profits are never guaranteed.
              </Text>
            </View>
          </View>

          <View style={styles.riskItem}>
            <Info size={20} color={colors.cyan} />
            <View style={styles.riskContent}>
              <Text style={styles.riskTitle}>Technical Risks</Text>
              <Text style={styles.riskDescription}>
                Network issues, smart contract bugs, or system failures could result in losses.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Important Disclaimers</Text>
          <Text style={styles.disclaimerText}>
            • MoneyPrinter is not a financial advisor{'\n'}
            • We do not provide investment advice{'\n'}
            • You are responsible for your trading decisions{'\n'}
            • Only invest what you can afford to lose{'\n'}
            • Consider consulting a financial advisor
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.agreement}>
          <Switch
            value={understood}
            onValueChange={setUnderstood}
            trackColor={{ false: colors.border, true: colors.green }}
            thumbColor={colors.text}
            testID="risk_checkbox"
          />
          <Text style={styles.agreementText}>
            I understand the trading risks and accept full responsibility for my trading decisions
          </Text>
        </View>
        <Button
          title="Next"
          variant="primary"
          size="large"
          disabled={!understood}
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
  scrollContent: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing(6),
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${colors.amber}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(4),
    borderWidth: 2,
    borderColor: colors.amber,
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
    textAlign: 'center',
  },
  warningCard: {
    backgroundColor: `${colors.red}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    marginBottom: spacing(6),
    borderWidth: 1,
    borderColor: `${colors.red}30`,
  },
  warningTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(2),
  },
  warningText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
  risks: {
    gap: spacing(3),
    marginBottom: spacing(6),
  },
  riskItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
  },
  riskContent: {
    flex: 1,
  },
  riskTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(1),
  },
  riskDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
  },
  disclaimer: {
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(2),
  },
  disclaimerText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
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