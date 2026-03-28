import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { TrendingUp, TrendingDown, Crown, Flame, Filter } from 'lucide-react-native';

const mockLeaderboard = [
  { id: '1', rank: 1, username: 'CryptoKing', avatar: null, pnl: 45234.56, roi: 234.5, streak: 15, delta: 0 },
  { id: '2', rank: 2, username: 'MoonShot', avatar: null, pnl: 34567.89, roi: 189.2, streak: 8, delta: 2 },
  { id: '3', rank: 3, username: 'DiamondHands', avatar: null, pnl: 28934.12, roi: 156.7, streak: 12, delta: -1 },
  { id: '4', rank: 4, username: 'WhaleWatcher', avatar: null, pnl: 23456.78, roi: 134.2, streak: 5, delta: 3 },
  { id: '5', rank: 5, username: 'PumpChaser', avatar: null, pnl: 19876.54, roi: 112.3, streak: 7, delta: -2 },
];

export default function LeaderboardScreen() {
  const [selectedTab, setSelectedTab] = useState<'top' | 'friends' | 'referrals'>('top');
  const [timeframe, setTimeframe] = useState('24h');

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity style={styles.leaderboardItem} activeOpacity={0.7}>
      <View style={styles.rankContainer}>
        {item.rank === 1 && <Crown size={20} color={colors.amber} style={styles.crown} />}
        <Text style={[styles.rank, item.rank <= 3 && styles.topRank]}>{item.rank}</Text>
        {item.delta !== 0 && (
          <View style={styles.deltaContainer}>
            {item.delta > 0 ? (
              <TrendingUp size={12} color={colors.green} />
            ) : (
              <TrendingDown size={12} color={colors.red} />
            )}
            <Text style={[styles.delta, item.delta > 0 ? styles.positive : styles.negative]}>
              {Math.abs(item.delta)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.username[0]}</Text>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>{item.username}</Text>
            {item.streak > 7 && (
              <View style={styles.streakBadge}>
                <Flame size={12} color={colors.amber} />
                <Text style={styles.streakText}>{item.streak}</Text>
              </View>
            )}
          </View>
          <Text style={styles.userStats}>
            ROI: {item.roi.toFixed(1)}%
          </Text>
        </View>
      </View>

      <View style={styles.pnlContainer}>
        <Text style={[styles.pnl, item.pnl >= 0 ? styles.positive : styles.negative]}>
          ${Math.abs(item.pnl).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'top' && styles.tabActive]}
          onPress={() => setSelectedTab('top')}
        >
          <Text style={[styles.tabText, selectedTab === 'top' && styles.tabTextActive]}>
            Top Printers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'friends' && styles.tabActive]}
          onPress={() => setSelectedTab('friends')}
        >
          <Text style={[styles.tabText, selectedTab === 'friends' && styles.tabTextActive]}>
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'referrals' && styles.tabActive]}
          onPress={() => setSelectedTab('referrals')}
        >
          <Text style={[styles.tabText, selectedTab === 'referrals' && styles.tabTextActive]}>
            Referrals
          </Text>
        </TouchableOpacity>
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
        data={mockLeaderboard}
        renderItem={renderItem}
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
  filterButton: {
    padding: spacing(2),
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing(6),
    marginBottom: spacing(4),
  },
  tab: {
    flex: 1,
    paddingVertical: spacing(3),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.green,
  },
  tabText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  tabTextActive: {
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
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    marginBottom: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    position: 'relative',
  },
  crown: {
    position: 'absolute',
    top: -12,
  },
  rank: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.textMuted,
  },
  topRank: {
    color: colors.green,
  },
  deltaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing(1),
  },
  delta: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    marginLeft: 2,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing(4),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing(3),
  },
  avatarText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.green,
  },
  userDetails: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2),
  },
  username: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.amber}20`,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    borderRadius: radii.xs,
    gap: spacing(1),
  },
  streakText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.amber,
  },
  userStats: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginTop: spacing(1),
  },
  pnlContainer: {
    alignItems: 'flex-end',
  },
  pnl: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
  },
  positive: {
    color: colors.green,
  },
  negative: {
    color: colors.red,
  },
});