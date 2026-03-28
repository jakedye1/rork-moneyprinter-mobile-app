import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors, fonts, spacing } from '@/constants/tokens';
import { useApp } from '@/store/app-store';

export default function RegisterScreen() {
  const router = useRouter();
  const { completeOnboarding, updateUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 10) {
      newErrors.password = 'Password must be at least 10 characters';
    } else if (!/(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) {
      newErrors.password = 'Password must contain a number and symbol';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateUser({
      id: '1',
      username: email.split('@')[0],
      displayName: email.split('@')[0],
      level: 1,
      xp: 0,
      totalPnl: 0,
      winRate: 0,
      streak: 0,
    });
    
    completeOnboarding();
    setLoading(false);
    
    router.replace('/(onboarding)/how-it-works');
  };

  const strengthColors = ['#EF4444', '#F59E0B', '#F59E0B', '#22C55E'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strength = getPasswordStrength();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your automated trading journey</Text>
            
            <View style={styles.inputs}>
              <Input
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                testID="email_input"
              />
              
              <Input
                label="Password"
                placeholder="At least 10 characters"
                value={password}
                onChangeText={setPassword}
                secure
                error={errors.password}
                helper="Must contain a number and symbol"
                testID="password_input"
              />
              
              {password && (
                <View style={styles.strengthMeter}>
                  <View style={styles.strengthBars}>
                    {[0, 1, 2, 3].map((i) => (
                      <View
                        key={i}
                        style={[
                          styles.strengthBar,
                          i < strength && { backgroundColor: strengthColors[strength - 1] },
                        ]}
                      />
                    ))}
                  </View>
                  <Text style={styles.strengthLabel}>
                    {strengthLabels[Math.max(0, strength - 1)]}
                  </Text>
                </View>
              )}
              
              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secure
                error={errors.confirmPassword}
                testID="confirm_password_input"
              />
              
              <Input
                label="Phone (Optional)"
                placeholder="+1 234 567 8900"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                error={errors.phone}
                helper="For account recovery"
                testID="phone_input"
              />
            </View>
            
            <Button
              title="Next"
              variant="primary"
              size="large"
              loading={loading}
              onPress={handleRegister}
              disabled={!email || !password || !confirmPassword}
              testID="register_button"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(8),
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: spacing(2),
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginBottom: spacing(8),
  },
  inputs: {
    marginBottom: spacing(6),
  },
  strengthMeter: {
    marginTop: -spacing(3),
    marginBottom: spacing(4),
  },
  strengthBars: {
    flexDirection: 'row',
    gap: spacing(1),
    marginBottom: spacing(1),
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
});