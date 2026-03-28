import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { Trophy, Download, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react-native';
import { TradeItem } from '@/types';

const mockTrades: TradeItem[] = [
  {
    id: '1',
    timestampIso: '2024-01-14T10:30:00Z',
    token: 'BONK',
    side: 'SELL',
    sizeUsd: 100,
    entryPrice: 0.000012,
    exitPrice: 0.000015,
    pnlUsd: 25,
    roiPct: 25,
    mode: 'TURBO',
    feesUsd: 2.5,
    txHash: '0x1234...5678',
    walletAddress: '0xabcd...efgh',
    xpEarned: 22,
  },
  {
    id: '2',
    timestampIso: '2024-01-14T09:15:00Z',
    token: 'WIF',
    side: 'BUY',
    sizeUsd: 50,
    entryPrice: 2.45,
    pnlUsd: -5,
    roiPct: -10,
    mode: 'SAFE',
    feesUsd: 1.5,
    txHash: '0x2345...6789',
    walletAddress: '0xabcd...efgh',
    xpEarned: 5,
  },
];

export default function ActivityScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'trades' | 'alerts' | 'system'>('all');
  const [timeframe, setTimeframe] = useState('24h');

  const handleExport = () => {
    Alert.alert(
      'Export Journal',
      'Export trading journal as CSV?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            // In a real app, this would generate and download CSV
            Alert.alert('Success', 'Journal exported successfully');
          },
        },
      ]
    );
  };

  const calculateSummary = () => {
    const totalXP = mockTrades.reduce((sum, trade) => sum + (trade.xpEarned || 0), 0);
    const totalPnL = mockTrades.reduce((sum, trade) => sum + (trade.pnlUsd || 0), 0);
    const winningTrades = mockTrades.filter(t => (t.pnlUsd || 0) > 0).length;
    const winRate = mockTrades.length > 0 ? (winningTrades / mockTrades.length) * 100 : 0;
    
    return { totalXP, totalPnL, winRate, tradeCount: mockTrades.length };
  };

  const summary = calculateSummary();

  const renderTradeItem = ({ item }: { item: TradeItem }) => (
    <TouchableOpacity style={styles.tradeCard} activeOpacity={0.7}>
      <View style={styles.tradeHeader}>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenName}>{item.token}</Text>
          <View style={[styles.sideBadge, item.side === 'BUY' ? styles.buyBadge : styles.sellBadge]}>
            <Text style={styles.sideText}>{item.side}</Text>
          </View>
        </View>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{item.xpEarned} XP</Text>
        </View>
      </View>

      <View style={styles.tradeDetails}>
        <View style={styles.tradeRow}>
          <Text style={styles.tradeLabel}>Size</Text>
          <Text style={styles.tradeValue}>${item.sizeUsd}</Text>
        </View>
        {item.exitPrice && (
          <View style={styles.tradeRow}>
            <Text style={styles.tradeLabel}>Entry → Exit</Text>
            <Text style={styles.tradeValue}>
              ${item.entryPrice?.toFixed(6)} → ${item.exitPrice.toFixed(6)}
            </Text>
          </View>
        )}
        <View style={styles.tradeRow}>
          <Text style={styles.tradeLabel}>P&L</Text>
          <View style={styles.pnlContainer}>
            {item.pnlUsd && item.pnlUsd > 0 ? (
              <TrendingUp size={14} color={colors.green} />
            ) : (
              <TrendingDown size={14} color={colors.red} />
            )}
            <Text style={[styles.pnlValue, item.pnlUsd && item.pnlUsd > 0 ? styles.positive : styles.negative]}>
              ${Math.abs(item.pnlUsd || 0).toFixed(2)} ({item.roiPct?.toFixed(1)}%)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tradeFooter}>
        <View style={[styles.modeBadge, { backgroundColor: `${colors.green}20` }]}>
          <Text style={[styles.modeText, { color: colors.green }]}>{item.mode}</Text>
        </View>
        <Text style={styles.timestamp}>
          {new Date(item.timestampIso).toLocaleTimeString()}
        </Text>
        <TouchableOpacity>
          <ExternalLink size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleExport} style={styles.headerButton}>
            <Download size={20} color={colors.green} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Trophy size={20} color={colors.amber} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>XP Earned</Text>
            <Text style={styles.summaryValue}>{summary.totalXP}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total P&L</Text>
            <Text style={[styles.summaryValue, summary.totalPnL >= 0 ? styles.positive : styles.negative]}>
              ${Math.abs(summary.totalPnL).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Trades</Text>
            <Text style={styles.summaryValue}>{summary.tradeCount}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Win Rate</Text>
            <Text style={styles.summaryValue}>{summary.winRate.toFixed(0)}%</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.filterTabs}>
          {(['all', 'trades', 'alerts', 'system'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, selectedFilter === filter && styles.filterTabActive]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterTabText, selectedFilter === filter && styles.filterTabTextActive]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.timeframes}>
        {['24h', '7d', '30d', 'All'].map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[styles.timeframeChip, timeframe === tf && styles.timeframeActive]}
            onPress={() => setTimeframe(tf)}
          >
            <Text style={[styles.timeframeText, timeframe === tf && styles.timeframeTextActive]}>
              {tf}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={mockTrades}
        renderItem={renderTradeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing(3),
  },
  headerButton: {
    padding: spacing(2),
  },
  summaryCard: {
    marginHorizontal: spacing(6),
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing(4),
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing(4),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing(3),
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginBottom: spacing(1),
  },
  summaryValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  filters: {
    paddingHorizontal: spacing(6),
    marginBottom: spacing(3),
  },
  filterTabs: {
    flexDirection: 'row',
    gap: spacing(2),
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing(2),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterTabActive: {
    borderBottomColor: colors.green,
  },
  filterTabText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  filterTabTextActive: {
    color: colors.green,
    fontWeight: fonts.weights.semibold,
  },
  timeframes: {
    flexDirection: 'row',
    paddingHorizontal: spacing(6),
    gap: spacing(2),
    marginBottom: spacing(4),
  },
  timeframeChip: {
    flex: 1,
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(3),
    borderRadius: radii.sm,
    backgroundColor: colors.card,
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
  listContent: {
    paddingHorizontal: spacing(6),
    paddingBottom: 100,
  },
  tradeCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing(4),
    marginBottom: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2),
  },
  tokenName: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  sideBadge: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    borderRadius: radii.xs,
  },
  buyBadge: {
    backgroundColor: `${colors.green}20`,
  },
  sellBadge: {
    backgroundColor: `${colors.red}20`,
  },
  sideText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  xpBadge: {
    backgroundColor: `${colors.cyan}20`,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    borderRadius: radii.xs,
  },
  xpText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.cyan,
  },
  tradeDetails: {
    gap: spacing(2),
    marginBottom: spacing(3),
  },
  tradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tradeLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  tradeValue: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
  },
  pnlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1),
  },
  pnlValue: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
  },
  positive: {
    color: colors.green,
  },
  negative: {
    color: colors.red,
  },
  tradeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeBadge: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    borderRadius: radii.xs,
  },
  modeText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
  },
  timestamp: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
});