import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '@/constants/tokens';
import { Mode } from '@/types';
import { MODE_PRESETS } from '@/constants/modes';

interface ModeButtonProps {
  mode: Mode;
  onPress: () => void;
  onLongPress: () => void;
}

export const ModeButton: React.FC<ModeButtonProps> = ({
  mode,
  onPress,
  onLongPress,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const preset = mode === 'CUSTOM' ? null : MODE_PRESETS[mode];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getRiskColor = () => {
    if (mode === 'CUSTOM') return colors.cyan;
    return preset?.color || colors.green;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          <View style={[styles.dot, { backgroundColor: getRiskColor() }]} />
          <Text style={styles.modeText}>{mode}</Text>
          <ChevronDown size={16} color={colors.textMuted} />
        </View>
        {preset && (
          <Text style={styles.description}>{preset.description}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(2),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modeText: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    flex: 1,
  },
  description: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginTop: spacing(1),
  },
});