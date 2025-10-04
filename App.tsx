/**
 * DDA.az Mobile App - Main Entry Point
 * React Native + Expo + TypeScript
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './src/i18n'; // Initialize i18n / i18n-i başlat
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { useSettingsStore } from './src/store/settingsStore';
import { useAuthStore } from './src/store/authStore';

// Create React Query client / React Query client yarat
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  const { loadSettings } = useSettingsStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Initialize app / Tətbiqi başlat
    const initializeApp = async () => {
      await loadSettings();
      await checkAuth();
    };

    initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <RootNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
