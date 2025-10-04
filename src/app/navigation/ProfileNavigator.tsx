/**
 * Profile Navigator - Profile & settings section / Profil və parametrlər bölməsi
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '@/features/profile/ProfileScreen';
import { SettingsScreen } from '@/features/profile/SettingsScreen';
import { TeacherScreen } from '@/features/teacher/TeacherScreen';

const Stack = createNativeStackNavigator();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileHome" 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Parametrlər' }}
      />
      <Stack.Screen 
        name="Teacher" 
        component={TeacherScreen}
        options={{ title: 'Müəllim Rejimi' }}
      />
    </Stack.Navigator>
  );
};
