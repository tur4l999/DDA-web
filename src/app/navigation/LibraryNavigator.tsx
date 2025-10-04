/**
 * Library Navigator - Books & PDFs section / Kitablar və PDF-lər bölməsi
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LibraryScreen } from '@/features/library/LibraryScreen';

const Stack = createNativeStackNavigator();

export const LibraryNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LibraryList" 
        component={LibraryScreen}
        options={{ title: 'Kitabxana' }}
      />
    </Stack.Navigator>
  );
};
