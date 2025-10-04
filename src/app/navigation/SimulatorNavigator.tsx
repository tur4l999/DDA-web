/**
 * Simulator Navigator - Exam & practice section / İmtahan və məşq bölməsi
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SimulatorScreen } from '@/features/simulator/SimulatorScreen';
import { ExamScreen } from '@/features/simulator/ExamScreen';
import { ResultsScreen } from '@/features/simulator/ResultsScreen';
import { HistoryScreen } from '@/features/simulator/HistoryScreen';

const Stack = createNativeStackNavigator();

export const SimulatorNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SimulatorHome" 
        component={SimulatorScreen}
        options={{ title: 'Simulator' }}
      />
      <Stack.Screen 
        name="Exam" 
        component={ExamScreen}
        options={{ title: 'İmtahan', headerShown: false }}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ title: 'Nəticələr', headerLeft: () => null }}
      />
      <Stack.Screen 
        name="History" 
        component={HistoryScreen}
        options={{ title: 'Tarixçə' }}
      />
    </Stack.Navigator>
  );
};
