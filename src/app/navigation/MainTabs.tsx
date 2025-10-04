/**
 * Main Tabs - Bottom tab navigation / Aşağı tab naviqasiyası
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '@/design/tokens';
import { Text } from 'react-native';

// Screens
import { HomeScreen } from '@/features/home/HomeScreen';
import { LearnNavigator } from './LearnNavigator';
import { SimulatorNavigator } from './SimulatorNavigator';
import { PackagesScreen } from '@/features/packages/PackagesScreen';
import { LibraryNavigator } from './LibraryNavigator';
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator();

// Simple icon component (replace with react-native-vector-icons)
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <Text style={{ fontSize: 24, color: focused ? Colors.primary : Colors.textMuted }}>
    {name === 'Home' && '🏠'}
    {name === 'Learn' && '📚'}
    {name === 'Simulator' && '🎯'}
    {name === 'Packages' && '💎'}
    {name === 'Library' && '📖'}
    {name === 'Profile' && '👤'}
  </Text>
);

export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ana səhifə',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnNavigator}
        options={{
          title: 'Öyrən',
          tabBarIcon: ({ focused }) => <TabIcon name="Learn" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Simulator"
        component={SimulatorNavigator}
        options={{
          title: 'Simulator',
          tabBarIcon: ({ focused }) => <TabIcon name="Simulator" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
          title: 'Paketlər',
          tabBarIcon: ({ focused }) => <TabIcon name="Packages" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryNavigator}
        options={{
          title: 'Kitabxana',
          tabBarIcon: ({ focused }) => <TabIcon name="Library" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};
