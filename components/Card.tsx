import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, fonts, radii, shadows, spacing } from '@/constants/tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, elevated = false }) => {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]}>
      {children}
    </View>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number;
  status?: 'positive' | 'negative' | 'neutral';
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  status = 'neutral',
  style,
}) => {
  return (
    <Card style={[styles.statCard, style]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {delta !== undefined && (
        <View style={styles.deltaContainer}>
          <Text style={[styles.delta, styles[`${status}Delta`]]}>
            {delta > 0 ? '+' : ''}{delta}%
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing(4),
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    ...shadows.card,
  },
  statCard: {
    padding: spacing(3),
  },
  statLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    fontFamily: fonts.family,
    marginBottom: spacing(1),
  },
  statValue: {
    fontSize: fonts.sizes.xl,
    color: colors.text,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
  },
  deltaContainer: {
    marginTop: spacing(1),
  },
  delta: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.medium,
  },
  positiveDelta: {
    color: colors.green,
  },
  negativeDelta: {
    color: colors.red,
  },
  neutralDelta: {
    color: colors.textMuted,
  },
});