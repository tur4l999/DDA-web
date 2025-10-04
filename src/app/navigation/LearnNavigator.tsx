/**
 * Learn Navigator - Learning section stack / Öyrənmə bölməsi stack
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearnScreen } from '@/features/learn/LearnScreen';
import { LessonDetailScreen } from '@/features/learn/LessonDetailScreen';

const Stack = createNativeStackNavigator();

export const LearnNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LearnList" 
        component={LearnScreen}
        options={{ title: 'Dərslər' }}
      />
      <Stack.Screen 
        name="LessonDetail" 
        component={LessonDetailScreen}
        options={{ title: 'Dərs' }}
      />
    </Stack.Navigator>
  );
};
