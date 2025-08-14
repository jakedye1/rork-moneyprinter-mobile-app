import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { CREDIT_PACKS } from '@/constants/modes';
import { Check, X, Zap } from 'lucide-react-native';

export default function SubscriptionScreen() {
  const router = useRouter();
  const { updateCredits } = useApp();
  const [selectedPack, setSelectedPack] = useState<string>('grinder');

  const handlePurchase = () => {
    const pack = CREDIT_PACKS.find(p => p.key === selectedPack);
    if (!pack) return;

    Alert.alert(
      'Purchase Credits',
      `Buy ${pack.trades} trades for $${pack.priceUsd}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Purchase',
          onPress: () => {
            updateCredits(pack.trades);
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.headline}>EVERY DIME IS A</Text>
          <Text style={styles.headline}>SHOT AT A MOON BAG</Text>
          <Text style={styles.subhead}>
            one solid snipe can earn back the entire pack—load up and let the printer work
          </Text>
        </View>

        <View style={styles.packs}>
          {CREDIT_PACKS.map((pack) => (
            <TouchableOpacity
              key={pack.key}
              style={[
                styles.packCard,
                selectedPack === pack.key && styles.packCardSelected,
                pack.popular && styles.packCardPopular,
              ]}
              onPress={() => setSelectedPack(pack.key)}
              activeOpacity={0.8}
            >
              {pack.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              
              <View style={styles.packHeader}>
                <Text style={styles.packName}>
                  {pack.key.charAt(0).toUpperCase() + pack.key.slice(1)}
                </Text>
                <View style={styles.packPrice}>
                  <Text style={styles.priceSymbol}>$</Text>
                  <Text style={styles.priceValue}>{pack.priceUsd}</Text>
                </View>
              </View>
              
              <View style={styles.packDetails}>
                <Text style={styles.packTrades}>{pack.trades} Trades</Text>
                <Text style={styles.packRounds}>≈ {Math.floor(pack.trades / 2)} round-trips</Text>
              </View>
              
              <Text style={styles.packCaption}>{pack.caption}</Text>
              
              <View style={styles.packSelection}>
                {selectedPack === pack.key ? (
                  <View style={styles.checkCircle}>
                    <Check size={16} color={colors.bg} />
                  </View>
                ) : (
                  <View style={styles.emptyCircle} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.autoTopUp}>
          <Zap size={20} color={colors.green} />
          <Text style={styles.autoTopUpText}>
            credits auto-top-up the moment you hit zero—no downtime, no missed launches. 
            cancel anytime in settings.
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Examples are illustrative only and not guarantees of profit. 
          Trading crypto is risky. Review the Risk Disclosure.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="PAY & START PRINTING"
          variant="primary"
          size="large"
          onPress={handlePurchase}
          testID="purchase_button"
        />
        <View style={styles.footerLinks}>
          <Button
            title="Manage Auto-Top-Up"
            variant="ghost"
            size="small"
            onPress={() => {}}
          />
          <Button
            title="View Receipts"
            variant="ghost"
            size="small"
            onPress={() => {}}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(2),
  },
  skipButton: {
    padding: spacing(2),
  },
  skipText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  scrollContent: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
  },
  hero: {
    marginBottom: spacing(8),
  },
  headline: {
    fontSize: 32,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    lineHeight: 36,
  },
  subhead: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginTop: spacing(3),
    lineHeight: 22,
  },
  packs: {
    gap: spacing(4),
    marginBottom: spacing(6),
  },
  packCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing(5),
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  packCardSelected: {
    borderColor: colors.green,
    backgroundColor: `${colors.green}10`,
  },
  packCardPopular: {
    borderColor: colors.green,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: spacing(4),
    backgroundColor: colors.green,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(1),
    borderRadius: radii.xs,
  },
  popularText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.bg,
  },
  packHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  packName: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    textTransform: 'uppercase',
  },
  packPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceSymbol: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.green,
  },
  priceValue: {
    fontSize: fonts.sizes.xxl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.green,
  },
  packDetails: {
    marginBottom: spacing(3),
  },
  packTrades: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  packRounds: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  packCaption: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing(3),
  },
  packSelection: {
    position: 'absolute',
    top: spacing(5),
    right: spacing(5),
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  autoTopUp: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(3),
    marginBottom: spacing(4),
    borderWidth: 1,
    borderColor: colors.border,
  },
  autoTopUpText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing(3),
  },
});