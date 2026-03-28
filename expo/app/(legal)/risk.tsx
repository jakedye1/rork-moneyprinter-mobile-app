import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radii } from '@/constants/tokens';

export default function RiskDisclosureScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last updated: January 14, 2025</Text>
        
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ HIGH RISK WARNING</Text>
          <Text style={styles.warningText}>
            Trading cryptocurrency carries a high level of risk and may result in the loss of 
            all your invested capital.
          </Text>
        </View>

        <Text style={styles.heading}>Market Risks</Text>
        <Text style={styles.paragraph}>
          • Extreme price volatility{'\n'}
          • Market manipulation{'\n'}
          • Liquidity risks{'\n'}
          • Regulatory changes
        </Text>

        <Text style={styles.heading}>Technical Risks</Text>
        <Text style={styles.paragraph}>
          • Smart contract vulnerabilities{'\n'}
          • Network congestion and failures{'\n'}
          • Exchange hacks or insolvency{'\n'}
          • Software bugs or errors
        </Text>

        <Text style={styles.heading}>Trading Bot Risks</Text>
        <Text style={styles.paragraph}>
          • Automated strategies may fail{'\n'}
          • Past performance doesn't guarantee future results{'\n'}
          • Slippage and execution delays{'\n'}
          • Unexpected market conditions
        </Text>

        <Text style={styles.heading}>Important Disclaimers</Text>
        <Text style={styles.paragraph}>
          MoneyPrinter is not a financial advisor. We do not provide investment advice. 
          You should only invest what you can afford to lose. Consider consulting with a 
          qualified financial advisor before trading.
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
  warningBox: {
    backgroundColor: `${colors.red}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: `${colors.red}30`,
    marginBottom: spacing(6),
  },
  warningTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.red,
    marginBottom: spacing(2),
  },
  warningText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 22,
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