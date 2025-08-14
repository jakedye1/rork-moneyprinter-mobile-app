import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { CREDIT_PACKS } from '@/constants/modes';
import { Check, Zap, CreditCard, FileText } from 'lucide-react-native';

export default function SubscriptionsScreen() {
  const { state, updateCredits, toggleAutoTopUp } = useApp();
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
            updateCredits(state.credits + pack.trades);
            Alert.alert('Success', `${pack.trades} credits added to your account`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Credits</Text>
          <View style={styles.creditBalance}>
            <Text style={styles.creditBalanceLabel}>Current Balance</Text>
            <Text style={styles.creditBalanceValue}>{state.credits} credits</Text>
          </View>
        </View>

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

        <TouchableOpacity
          style={styles.autoTopUp}
          onPress={() => {
            const newValue = toggleAutoTopUp();
            Alert.alert(
              'Auto Top-Up',
              `Auto top-up ${newValue ? 'enabled' : 'disabled'}`
            );
          }}
          activeOpacity={0.7}
        >
          <View style={styles.autoTopUpContent}>
            <Zap size={20} color={colors.green} />
            <View style={styles.autoTopUpTextContainer}>
              <Text style={styles.autoTopUpTitle}>Auto Top-Up</Text>
              <Text style={styles.autoTopUpText}>
                Automatically refill when you hit zero
              </Text>
            </View>
          </View>
          <View style={[styles.toggle, state.autoTopUp && styles.toggleActive]}>
            <View style={[styles.toggleThumb, state.autoTopUp && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryAction}>
            <CreditCard size={20} color={colors.textMuted} />
            <Text style={styles.secondaryActionText}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <FileText size={20} color={colors.textMuted} />
            <Text style={styles.secondaryActionText}>View Receipts</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          Examples are illustrative only and not guarantees of profit. 
          Trading crypto is risky. Review the Risk Disclosure.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
          activeOpacity={0.8}
        >
          <Text style={styles.purchaseButtonText}>PAY & START PRINTING</Text>
        </TouchableOpacity>
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
    paddingBottom: 120,
  },
  header: {
    paddingVertical: spacing(4),
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(3),
  },
  creditBalance: {
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  creditBalanceLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginBottom: spacing(1),
  },
  creditBalanceValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.green,
  },
  hero: {
    marginVertical: spacing(6),
  },
  headline: {
    fontSize: 28,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    lineHeight: 32,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing(4),
  },
  autoTopUpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3),
    flex: 1,
  },
  autoTopUpTextContainer: {
    flex: 1,
  },
  autoTopUpTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  autoTopUpText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: colors.green,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.text,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing(3),
    marginBottom: spacing(6),
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(2),
    backgroundColor: colors.card,
    padding: spacing(3),
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryActionText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  disclaimer: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  purchaseButton: {
    backgroundColor: colors.green,
    paddingVertical: spacing(4),
    borderRadius: radii.md,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.bg,
  },
});