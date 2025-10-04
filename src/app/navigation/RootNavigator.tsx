/**
 * Root Navigator - Main navigation entry point / Əsas naviqasiya giriş nöqtəsi
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { LoadingSpinner } from '@/components';

// Navigators
import { OnboardingStack } from './OnboardingStack';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const { hasSeenOnboarding, loadSettings } = useSettingsStore();

  useEffect(() => {
    // Load settings and check auth on mount / Parametrləri yüklə və auth yoxla
    loadSettings();
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
