import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, RefreshControl, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, StatCard } from '@/components/Card';
import { ModeButton } from '@/components/ModeButton';
import { colors, fonts, spacing, radii, shadows } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { 
  Play, Pause, Settings, Download, Bell, Wallet,
  TrendingUp, TrendingDown,
  ChevronRight, Copy, Eye, EyeOff
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function DashboardScreen() {
  const router = useRouter();
  const { state, cycleMode, toggleBot } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state.botStatus === 'RUNNING') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [state.botStatus, pulseAnim]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleModePress = useCallback(() => {
    const newMode = cycleMode();
    console.log(`Mode changed to: ${newMode}`);
  }, [cycleMode]);

  const handleModeLongPress = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    console.log('Long press mode button');
  }, []);

  const handleBotToggle = useCallback(() => {
    if (state.credits === 0) {
      Alert.alert('No Credits', 'Purchase credits to start trading');
      router.push('/(tabs)/subscriptions');
      return;
    }
    
    if (!state.walletConnected) {
      Alert.alert('Wallet Required', 'Connect your wallet to start trading');
      return;
    }
    
    const newStatus = toggleBot();
    console.log(`Bot ${newStatus === 'RUNNING' ? 'started' : 'paused'}`);
  }, [state.credits, state.walletConnected, toggleBot, router]);

  const handleToggleBalance = useCallback(() => {
    setBalanceVisible(!balanceVisible);
  }, [balanceVisible]);

  const handleTimeframeSelect = useCallback((tf: string) => {
    setSelectedTimeframe(tf);
  }, []);

  const handleSettingsPress = useCallback(() => {
    router.push('/modal');
  }, [router]);

  const handleCopyAddress = useCallback(() => {
    console.log('Copy wallet address');
  }, []);

  const handleQuickAction = useCallback((action: string) => {
    console.log(`Quick action: ${action}`);
  }, []);

  const handleCreditsPress = useCallback(() => {
    router.push('/(tabs)/subscriptions');
  }, [router]);

  const mockBalance = 12543.67;
  const mockPnL = 1234.56;
  const mockPnLPercent = 10.9;
  const mockWinRate = 67;
  const mockDrawdown = -5.2;

  // Always render the same components to maintain hooks order
  const showWallet = state.walletConnected;
  const showCreditsWarning = state.credits === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.green} />
        }
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>MoneyPrinter</Text>
            <TouchableOpacity onPress={handleSettingsPress}>
              <Settings size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <Card style={styles.balanceCard} elevated>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <TouchableOpacity onPress={handleToggleBalance}>
                {balanceVisible ? (
                  <Eye size={20} color={colors.textMuted} />
                ) : (
                  <EyeOff size={20} color={colors.textMuted} />
                )}
              </TouchableOpacity>
            </View>
            
            <Text style={styles.balanceValue}>
              {balanceVisible ? `$${mockBalance.toLocaleString()}` : '••••••'}
            </Text>
            
            <View style={styles.pnlContainer}>
              <View style={styles.pnlBadge}>
                {mockPnL >= 0 ? (
                  <TrendingUp size={16} color={colors.green} />
                ) : (
                  <TrendingDown size={16} color={colors.red} />
                )}
                <Text style={[styles.pnlValue, mockPnL >= 0 ? styles.positive : styles.negative]}>
                  {mockPnL >= 0 ? '+' : ''}{balanceVisible ? `$${Math.abs(mockPnL).toFixed(2)}` : '•••'}
                </Text>
                <Text style={[styles.pnlPercent, mockPnL >= 0 ? styles.positive : styles.negative]}>
                  ({mockPnLPercent >= 0 ? '+' : ''}{mockPnLPercent}%)
                </Text>
              </View>
            </View>

            {/* Timeframe Selector */}
            <View style={styles.timeframes}>
              {['24h', '7d', '30d', 'All'].map((tf) => (
                <TouchableOpacity
                  key={tf}
                  style={[styles.timeframeChip, selectedTimeframe === tf && styles.timeframeActive]}
                  onPress={() => handleTimeframeSelect(tf)}
                >
                  <Text style={[styles.timeframeText, selectedTimeframe === tf && styles.timeframeTextActive]}>
                    {tf}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Mini Stats */}
            <View style={styles.miniStats}>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatLabel}>Win Rate</Text>
                <Text style={styles.miniStatValue}>{mockWinRate}%</Text>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniStatLabel}>Max Drawdown</Text>
                <Text style={[styles.miniStatValue, styles.negative]}>{mockDrawdown}%</Text>
              </View>
            </View>
          </Card>

          {/* Bot Control */}
          <View style={styles.botControl}>
            <ModeButton
              mode={state.currentMode}
              onPress={handleModePress}
              onLongPress={handleModeLongPress}
            />
            
            <Card style={styles.botStatusCard}>
              <View style={styles.botStatusHeader}>
                <View style={styles.statusIndicator}>
                  <Animated.View
                    style={[
                      styles.statusDot,
                      { 
                        backgroundColor: state.botStatus === 'RUNNING' ? colors.green : 
                                       state.botStatus === 'PAUSED' ? colors.amber : 
                                       colors.textMuted,
                        transform: [{ scale: pulseAnim }]
                      }
                    ]}
                  />
                  <Text style={styles.statusText}>
                    {state.botStatus === 'RUNNING' ? 'Running' :
                     state.botStatus === 'PAUSED' ? 'Paused' : 'Stopped'}
                  </Text>
                </View>
                {state.botStatus === 'RUNNING' && (
                  <Text style={styles.nextCheck}>Next check: 2m 15s</Text>
                )}
              </View>
              
              <TouchableOpacity
                style={[styles.botButton, state.botStatus === 'RUNNING' && styles.botButtonPause]}
                onPress={handleBotToggle}
                activeOpacity={0.8}
              >
                {state.botStatus === 'RUNNING' ? (
                  <Pause size={24} color={colors.bg} />
                ) : (
                  <Play size={24} color={colors.bg} />
                )}
                <Text style={styles.botButtonText}>
                  {state.botStatus === 'RUNNING' ? 'Pause' : 'Start'}
                </Text>
              </TouchableOpacity>
            </Card>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('config')}>
              <Settings size={20} color={colors.green} />
              <Text style={styles.quickActionText}>Config</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('export')}>
              <Download size={20} color={colors.green} />
              <Text style={styles.quickActionText}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('alerts')}>
              <Bell size={20} color={colors.green} />
              <Text style={styles.quickActionText}>Alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => handleQuickAction('wallet')}>
              <Wallet size={20} color={colors.green} />
              <Text style={styles.quickActionText}>Wallet</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Stats */}
          <View style={styles.statsGrid}>
            <StatCard
              label="Trades Today"
              value="12"
              delta={20}
              status="positive"
              style={styles.statCard}
            />
            <StatCard
              label="Avg ROI"
              value="8.5%"
              delta={2.3}
              status="positive"
              style={styles.statCard}
            />
            <StatCard
              label="Total Fees"
              value="$45"
              delta={-5}
              status="negative"
              style={styles.statCard}
            />
            <StatCard
              label="Best Trade"
              value="+$234"
              status="positive"
              style={styles.statCard}
            />
          </View>

          {/* Insights */}
          <Card style={styles.insightCard}>
            <Text style={styles.insightTitle}>💡 Insight</Text>
            <Text style={styles.insightText}>
              Based on your last 20 trades, Turbo mode outperformed Safe by 12%. 
              Consider increasing TP to 8-12%.
            </Text>
          </Card>

          {/* Wallet Snapshot */}
          {showWallet ? (
            <Card style={styles.walletCard}>
              <View style={styles.walletHeader}>
                <Text style={styles.walletTitle}>Wallet</Text>
                <TouchableOpacity onPress={handleCopyAddress}>
                  <Copy size={16} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
              <Text style={styles.walletAddress}>
                {balanceVisible ? '0x1234...5678' : '••••••••••'}
              </Text>
              <View style={styles.walletBalance}>
                <Text style={styles.walletBalanceLabel}>SOL Balance</Text>
                <Text style={styles.walletBalanceValue}>
                  {balanceVisible ? '42.5 SOL' : '•••'}
                </Text>
              </View>
            </Card>
          ) : null}

          {/* Credits Warning */}
          {showCreditsWarning ? (
            <TouchableOpacity
              style={styles.creditWarning}
              onPress={handleCreditsPress}
            >
              <Text style={styles.creditWarningText}>
                ⚠️ No credits remaining. Tap to purchase.
              </Text>
              <ChevronRight size={20} color={colors.amber} />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, state.botStatus === 'RUNNING' && styles.fabPause]}
        onPress={handleBotToggle}
        activeOpacity={0.8}
      >
        {state.botStatus === 'RUNNING' ? (
          <Pause size={28} color={colors.bg} />
        ) : (
          <Play size={28} color={colors.bg} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: spacing(4),
    paddingTop: spacing(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(6),
  },
  logo: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.green,
  },
  balanceCard: {
    marginBottom: spacing(6),
    padding: spacing(5),
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(2),
  },
  balanceLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  balanceValue: {
    fontSize: 36,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(3),
  },
  pnlContainer: {
    marginBottom: spacing(4),
  },
  pnlBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2),
  },
  pnlValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
  },
  pnlPercent: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
  },
  positive: {
    color: colors.green,
  },
  negative: {
    color: colors.red,
  },
  timeframes: {
    flexDirection: 'row',
    gap: spacing(2),
    marginBottom: spacing(4),
  },
  timeframeChip: {
    flex: 1,
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(3),
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  timeframeActive: {
    backgroundColor: colors.green,
  },
  timeframeText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  timeframeTextActive: {
    color: colors.bg,
    fontWeight: fonts.weights.semibold,
  },
  miniStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  miniStat: {
    alignItems: 'center',
  },
  miniStatLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginBottom: spacing(1),
  },
  miniStatValue: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  botControl: {
    gap: spacing(4),
    marginBottom: spacing(6),
  },
  botStatusCard: {
    padding: spacing(4),
  },
  botStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2),
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.medium,
    color: colors.text,
  },
  nextCheck: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  botButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(2),
    backgroundColor: colors.green,
    paddingVertical: spacing(3),
    borderRadius: radii.sm,
  },
  botButtonPause: {
    backgroundColor: colors.amber,
  },
  botButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.bg,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing(6),
  },
  quickAction: {
    alignItems: 'center',
    gap: spacing(1),
  },
  quickActionText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(3),
    marginBottom: spacing(6),
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
  },
  insightCard: {
    padding: spacing(4),
    marginBottom: spacing(6),
    backgroundColor: `${colors.cyan}10`,
    borderColor: `${colors.cyan}30`,
  },
  insightTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(2),
  },
  insightText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
  walletCard: {
    padding: spacing(4),
    marginBottom: spacing(6),
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(2),
  },
  walletTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  walletAddress: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginBottom: spacing(3),
  },
  walletBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletBalanceLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  walletBalanceValue: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  creditWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${colors.amber}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: `${colors.amber}30`,
  },
  creditWarningText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: spacing(6),
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  fabPause: {
    backgroundColor: colors.amber,
  },
});