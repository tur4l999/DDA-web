/**
 * Empty State Component - Placeholder for empty lists / Boş siyahı üçün yer tutucu
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { Colors, Typography, Spacing } from '@/design/tokens';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      
      <Text style={styles.title}>{title}</Text>
      
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.h3,
    fontWeight: Typography.semibold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    maxWidth: 300,
  },
  button: {
    minWidth: 200,
  },
});
