import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { TrendingUp, Shield, Zap, DollarSign } from 'lucide-react-native';

export default function HowItWorksScreen() {
  const router = useRouter();

  const features = [
    {
      icon: <TrendingUp size={24} color={colors.green} />,
      title: 'Smart Trading',
      description: 'AI-powered bot analyzes market trends and executes trades automatically',
    },
    {
      icon: <Shield size={24} color={colors.cyan} />,
      title: 'Risk Management',
      description: 'Choose from Safe, Turbo, or YOLO modes based on your risk tolerance',
    },
    {
      icon: <Zap size={24} color={colors.amber} />,
      title: '24/7 Operation',
      description: 'Never miss an opportunity - the bot trades round the clock',
    },
    {
      icon: <DollarSign size={24} color={colors.green} />,
      title: 'Pay Per Trade',
      description: 'Simple credit system - only pay for trades that execute',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>How MoneyPrinter Works</Text>
          <Text style={styles.subtitle}>
            Your automated crypto trading assistant
          </Text>
        </View>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>{feature.icon}</View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.steps}>
          <Text style={styles.stepsTitle}>Getting Started</Text>
          <View style={styles.stepsList}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Connect your wallet securely</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Choose your trading mode</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Add credits to start trading</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>Monitor profits in real-time</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Next"
          variant="primary"
          size="large"
          onPress={() => router.push('/manage-key')}
          testID="next_button"
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
    marginBottom: spacing(8),
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
  features: {
    gap: spacing(4),
    marginBottom: spacing(8),
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(4),
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(1),
  },
  featureDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
  },
  steps: {
    marginBottom: spacing(8),
  },
  stepsTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(4),
  },
  stepsList: {
    gap: spacing(3),
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3),
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.bg,
  },
  stepText: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.text,
  },
  footer: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});