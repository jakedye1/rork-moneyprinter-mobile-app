import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/Card';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { 
  Edit2, Download, Shield, CreditCard, FileText, 
  LogOut, ChevronRight, Trophy, Flame, TrendingUp,
  Users, Settings, HelpCircle
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const router = useRouter();
  const { state, signOut } = useApp();
  const user = state.user || {
    username: 'trader123',
    displayName: 'Crypto Trader',
    bio: 'Making money while I sleep 💰',
    level: 5,
    xp: 1250,
    totalPnl: 5432.10,
    winRate: 67,
    streak: 7,
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            if (Platform.OS !== 'web') {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
            
            const success = await signOut();
            if (success) {
              // Navigate to welcome screen and reset navigation stack
              router.replace('/(auth)/welcome');
            } else {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { icon: Trophy, label: 'Rewards', onPress: () => {}, testID: 'profile_rewards_btn' },
    { icon: Users, label: 'Referrals', onPress: () => {}, testID: 'profile_referrals_btn' },
    { icon: Download, label: 'Export Journal', onPress: () => {}, testID: 'profile_export_csv_btn' },
    { icon: Settings, label: 'Settings', onPress: () => router.push('/modal'), testID: 'profile_settings_btn' },
    { icon: Shield, label: 'Security', onPress: () => {}, testID: 'profile_security_btn' },
    { icon: CreditCard, label: 'Payment Methods', onPress: () => {}, testID: 'profile_payments_btn' },
    { icon: FileText, label: 'Legal', onPress: () => {}, testID: 'profile_legal_btn' },
    { icon: HelpCircle, label: 'Help Center', onPress: () => {}, testID: 'profile_help_btn' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={() => {}}>
            <Edit2 size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard} elevated>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.username[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.username}>@{user.username}</Text>
              <Text style={styles.displayName}>{user.displayName}</Text>
              {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
            </View>
          </View>

          <View style={styles.levelContainer}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>Level {user.level}</Text>
              <Text style={styles.xpText}>{user.xp} XP</Text>
            </View>
            <View style={styles.levelProgress}>
              <View style={[styles.levelProgressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.nextLevel}>
              {250 * (user.level + 1) - user.xp} XP to Level {user.level + 1}
            </Text>
          </View>
        </Card>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp size={20} color={colors.green} />
            </View>
            <Text style={styles.statValue}>
              ${user.totalPnl.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total P&L</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Trophy size={20} color={colors.amber} />
            </View>
            <Text style={styles.statValue}>{user.winRate}%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Flame size={20} color={colors.amber} />
            </View>
            <Text style={styles.statValue}>{user.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
              testID={item.testID}
            >
              <View style={styles.menuItemLeft}>
                <item.icon size={20} color={colors.textMuted} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity 
          style={styles.signOutButton} 
          activeOpacity={0.7}
          testID="settings_signout_btn"
          onPress={handleSignOut}
        >
          <LogOut size={20} color={colors.red} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing(4),
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
  },
  profileCard: {
    padding: spacing(5),
    marginBottom: spacing(6),
  },
  profileHeader: {
    flexDirection: 'row',
    gap: spacing(4),
    marginBottom: spacing(4),
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.bg,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.green,
  },
  displayName: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
  },
  bio: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginTop: spacing(1),
  },
  levelContainer: {
    paddingTop: spacing(3),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing(2),
  },
  levelLabel: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
  },
  xpText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.green,
  },
  levelProgress: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing(1),
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: colors.green,
  },
  nextLevel: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing(3),
    marginBottom: spacing(6),
  },
  statCard: {
    flex: 1,
    padding: spacing(3),
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: spacing(2),
  },
  statValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(1),
  },
  statLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
  menu: {
    marginBottom: spacing(6),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    marginBottom: spacing(2),
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(3),
  },
  menuItemText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.text,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(2),
    backgroundColor: colors.card,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.red,
    marginBottom: spacing(6),
  },
  signOutText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.red,
  },
  version: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing(4),
  },
});