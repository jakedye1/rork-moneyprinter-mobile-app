import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors, fonts, spacing } from '@/constants/tokens';
import { useApp } from '@/store/app-store';

export default function LoginScreen() {
  const router = useRouter();
  const { completeOnboarding, updateUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue trading</Text>
            
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
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secure
                error={errors.password}
                testID="password_input"
              />
            </View>
            
            <Button
              title="Forgot Password?"
              variant="ghost"
              size="small"
              onPress={() => {}}
              style={styles.forgotButton}
            />
            
            <Button
              title="Continue"
              variant="primary"
              size="large"
              loading={loading}
              onPress={handleLogin}
              disabled={!email || !password}
              testID="login_button"
            />
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <Button
              title="Sign in with Apple"
              variant="secondary"
              size="large"
              onPress={() => {}}
            />
            
            <Button
              title="Sign in with Google"
              variant="secondary"
              size="large"
              onPress={() => {}}
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
    marginBottom: spacing(2),
  },
  forgotButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing(6),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing(6),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing(4),
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
  },
});