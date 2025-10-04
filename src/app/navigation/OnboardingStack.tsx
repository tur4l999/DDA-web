/**
 * Onboarding Stack - First-time user flow / İlk dəfə istifadəçi axını
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '@/features/onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator();

export const OnboardingStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingSlides" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};
