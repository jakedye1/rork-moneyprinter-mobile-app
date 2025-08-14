import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors, fonts, radii, spacing } from '@/constants/tokens';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  secure?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  secure = false,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secure && !showPassword}
          {...props}
        />
        {secure && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.textMuted} />
            ) : (
              <Eye size={20} color={colors.textMuted} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {helper && !error && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing(4),
  },
  label: {
    fontSize: fonts.sizes.sm,
    color: colors.text,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.medium,
    marginBottom: spacing(2),
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
    fontSize: fonts.sizes.md,
    color: colors.text,
    fontFamily: fonts.family,
  },
  inputError: {
    borderColor: colors.red,
  },
  eyeButton: {
    position: 'absolute',
    right: spacing(3),
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  error: {
    fontSize: fonts.sizes.sm,
    color: colors.red,
    fontFamily: fonts.family,
    marginTop: spacing(1),
  },
  helper: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    fontFamily: fonts.family,
    marginTop: spacing(1),
  },
});