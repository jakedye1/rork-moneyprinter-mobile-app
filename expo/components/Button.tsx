import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors, fonts, radii, shadows } from '@/constants/tokens';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.bg : colors.green}
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadows.button,
  },
  primary: {
    backgroundColor: colors.green,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.md,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: radii.md,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
  },
  primaryText: {
    color: colors.bg,
  },
  secondaryText: {
    color: colors.text,
  },
  ghostText: {
    color: colors.green,
  },
  smallText: {
    fontSize: fonts.sizes.sm,
  },
  mediumText: {
    fontSize: fonts.sizes.md,
  },
  largeText: {
    fontSize: fonts.sizes.lg,
  },
});