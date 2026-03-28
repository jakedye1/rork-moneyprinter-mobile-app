import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Mode, BotParams, BotStatus, UserProfile } from '@/types';
import { MODE_PRESETS } from '@/constants/modes';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const STORAGE_KEY = '@moneyprinter:app_state';

export const [AppProvider, useApp] = createContextHook(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<AppState>({
    isOnboarded: false,
    hasAcceptedTerms: false,
    hasAcceptedRisk: false,
    walletConnected: false,
    currentMode: 'SAFE',
    botStatus: 'STOPPED',
    credits: 0,
    autoTopUp: false,
  });

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveState = async (newState: AppState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  };

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      saveState(newState);
      return newState;
    });
  }, []);

  const cycleMode = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    const modes: Mode[] = ['SAFE', 'TURBO', 'YOLO'];
    const currentIndex = modes.indexOf(state.currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];
    
    updateState({ currentMode: nextMode });
    return nextMode;
  }, [state.currentMode, updateState]);

  const setMode = useCallback((mode: Mode) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    updateState({ currentMode: mode });
  }, [updateState]);

  const setCustomParams = useCallback((params: BotParams) => {
    updateState({ customParams: params, currentMode: 'CUSTOM' });
  }, [updateState]);

  const toggleBot = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    const newStatus: BotStatus = state.botStatus === 'RUNNING' ? 'PAUSED' : 'RUNNING';
    updateState({ botStatus: newStatus });
    return newStatus;
  }, [state.botStatus, updateState]);

  const stopBot = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    updateState({ botStatus: 'STOPPED' });
  }, [updateState]);

  const connectWallet = useCallback((privateKey: string) => {
    updateState({ walletConnected: true, privateKey });
  }, [updateState]);

  const disconnectWallet = useCallback(() => {
    updateState({ walletConnected: false, privateKey: undefined });
  }, [updateState]);

  const acceptTerms = useCallback(() => {
    updateState({ hasAcceptedTerms: true });
  }, [updateState]);

  const acceptRisk = useCallback(() => {
    updateState({ hasAcceptedRisk: true });
  }, [updateState]);

  const completeOnboarding = useCallback(() => {
    updateState({ isOnboarded: true });
  }, [updateState]);

  const updateCredits = useCallback((credits: number) => {
    updateState({ credits });
  }, [updateState]);

  const toggleAutoTopUp = useCallback(() => {
    const newValue = !state.autoTopUp;
    updateState({ autoTopUp: newValue });
    return newValue;
  }, [state.autoTopUp, updateState]);

  const updateUser = useCallback((user: Partial<UserProfile>) => {
    setState(prev => {
      const newState = {
        ...prev,
        user: prev.user ? { ...prev.user, ...user } : (user as UserProfile),
      };
      saveState(newState);
      return newState;
    });
  }, []);

  const signOut = useCallback(async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEY);
      
      // Reset state to initial values
      const initialState: AppState = {
        isOnboarded: false,
        hasAcceptedTerms: false,
        hasAcceptedRisk: false,
        walletConnected: false,
        currentMode: 'SAFE',
        botStatus: 'STOPPED',
        credits: 0,
        autoTopUp: false,
      };
      
      setState(initialState);
      
      return true;
    } catch (error) {
      console.error('Failed to sign out:', error);
      return false;
    }
  }, []);

  const getCurrentModeParams = useCallback((): BotParams => {
    if (state.currentMode === 'CUSTOM' && state.customParams) {
      return state.customParams;
    }
    return MODE_PRESETS[state.currentMode]?.params || MODE_PRESETS.SAFE.params;
  }, [state.currentMode, state.customParams]);

  return {
    isLoading,
    state,
    cycleMode,
    setMode,
    setCustomParams,
    toggleBot,
    stopBot,
    connectWallet,
    disconnectWallet,
    acceptTerms,
    acceptRisk,
    completeOnboarding,
    updateCredits,
    toggleAutoTopUp,
    updateUser,
    getCurrentModeParams,
    signOut,
  };
});