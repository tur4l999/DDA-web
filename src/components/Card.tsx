/**
 * Card Component - Container with shadow / Kölgəli konteyner
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Shadows, Spacing } from '@/design/tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'lg',
}) => {
  return (
    <View
      style={[
        styles.card,
        { padding: Spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.md,
    ...Shadows.md,
  },
});
