import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, fonts, spacing, radii } from '@/constants/tokens';
import { useApp } from '@/store/app-store';
import { Wallet, Key, Shield, Eye, EyeOff, QrCode } from 'lucide-react-native';

export default function AddKeyScreen() {
  const router = useRouter();
  const { connectWallet } = useApp();
  const [privateKey, setPrivateKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [inputMode, setInputMode] = useState<'connect' | 'import'>('connect');

  const validateKey = () => {
    const trimmed = privateKey.trim();
    const words = trimmed.split(/\s+/);
    
    // Check for mnemonic phrase (12 or 24 words)
    if (words.length === 12 || words.length === 24) {
      return true;
    }
    
    // Check for hex private key (64 characters)
    if (/^[0-9a-fA-F]{64}$/.test(trimmed)) {
      return true;
    }
    
    return false;
  };

  const handleConnect = () => {
    Alert.alert(
      'Connect Phantom',
      'This will open Phantom wallet to connect. Make sure you have Phantom installed.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Connect', 
          onPress: () => {
            // Simulate wallet connection
            connectWallet('phantom_connected');
            router.push('/subscription');
          }
        },
      ]
    );
  };

  const handleImport = () => {
    if (!validateKey()) {
      Alert.alert('Invalid Key', 'Please enter a valid 12/24 word phrase or 64-character hex key.');
      return;
    }
    
    connectWallet(privateKey);
    router.push('/subscription');
  };

  const handleSkip = () => {
    router.push('/subscription');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Wallet size={48} color={colors.green} />
          </View>
          <Text style={styles.title}>Connect Your Wallet</Text>
          <Text style={styles.subtitle}>
            Two secure options to get started
          </Text>
        </View>

        {inputMode === 'connect' ? (
          <>
            <TouchableOpacity 
              style={styles.connectCard} 
              onPress={handleConnect}
              testID="wallet_connect_btn"
            >
              <View style={styles.connectIcon}>
                <Wallet size={24} color={colors.green} />
              </View>
              <View style={styles.connectContent}>
                <Text style={styles.connectTitle}>Connect Phantom Wallet</Text>
                <Text style={styles.connectDescription}>
                  Recommended - Most secure option
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Import Secret Phrase"
              variant="secondary"
              size="large"
              icon={<Key size={20} color={colors.text} />}
              onPress={() => setInputMode('import')}
              testID="wallet_import_btn"
            />
          </>
        ) : (
          <>
            <View style={styles.securityNote}>
              <Shield size={20} color={colors.green} />
              <Text style={styles.securityText} testID="wallet_disclosure_text">
                We never store your key on our servers. It&apos;s encrypted and saved locally 
                in your device&apos;s Secure Enclave.
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Private Key or Secret Phrase</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={privateKey}
                  onChangeText={setPrivateKey}
                  placeholder="Enter 12/24 words or hex key"
                  placeholderTextColor={colors.textMuted}
                  multiline
                  numberOfLines={4}
                  secureTextEntry={!showKey}
                  testID="key_input"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff size={20} color={colors.textMuted} />
                  ) : (
                    <Eye size={20} color={colors.textMuted} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.inputHelper}>
                Enter your 12 or 24 word recovery phrase, or 64-character hex private key
              </Text>
            </View>

            <View style={styles.importActions}>
              <Button
                title="Scan QR Code"
                variant="secondary"
                icon={<QrCode size={20} color={colors.text} />}
                onPress={() => Alert.alert('QR Scanner', 'QR scanning not available in this demo')}
              />
              <Button
                title="Back to Options"
                variant="ghost"
                onPress={() => setInputMode('connect')}
              />
            </View>
          </>
        )}

        <View style={styles.warningCard}>
          <Text style={styles.warningText}>
            ⚠️ If you lose access to your device, we cannot recover your wallet. 
            Make sure you have a backup.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {inputMode === 'import' ? (
          <Button
            title="Continue"
            variant="primary"
            size="large"
            disabled={!privateKey}
            onPress={handleImport}
            testID="continue_button"
          />
        ) : (
          <Button
            title="Skip for Now"
            variant="ghost"
            size="large"
            onPress={handleSkip}
            testID="skip_button"
          />
        )}
      </View>
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
    paddingVertical: spacing(4),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing(8),
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(4),
    borderWidth: 2,
    borderColor: colors.green,
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
    textAlign: 'center',
  },
  connectCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing(5),
    borderRadius: radii.md,
    gap: spacing(4),
    marginBottom: spacing(6),
    borderWidth: 2,
    borderColor: colors.green,
  },
  connectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectContent: {
    flex: 1,
  },
  connectTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.semibold,
    color: colors.text,
    marginBottom: spacing(1),
  },
  connectDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.green,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(6),
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
  securityNote: {
    flexDirection: 'row',
    backgroundColor: `${colors.green}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    gap: spacing(3),
    marginBottom: spacing(6),
    borderWidth: 1,
    borderColor: `${colors.green}30`,
  },
  securityText: {
    flex: 1,
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: spacing(6),
  },
  inputLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    fontWeight: fonts.weights.medium,
    color: colors.text,
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
    padding: spacing(4),
    paddingRight: spacing(12),
    fontSize: fonts.sizes.md,
    color: colors.text,
    fontFamily: fonts.family,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  eyeButton: {
    position: 'absolute',
    right: spacing(3),
    top: spacing(3),
  },
  inputHelper: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.textMuted,
    marginTop: spacing(2),
  },
  importActions: {
    gap: spacing(3),
    marginBottom: spacing(6),
  },
  warningCard: {
    backgroundColor: `${colors.amber}15`,
    padding: spacing(4),
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: `${colors.amber}30`,
  },
  warningText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family,
    color: colors.text,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(4),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});