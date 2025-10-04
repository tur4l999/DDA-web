/**
 * Button Component - Primary action button / Əsas düymə komponenti
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, BorderRadius, Typography, Spacing } from '@/design/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles] as TextStyle,
    styles[`${size}Text` as keyof typeof styles] as TextStyle,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'ghost' ? Colors.primary : Colors.textInverse}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  
  // Sizes
  small: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  
  // Text styles
  text: {
    fontWeight: Typography.semibold,
  },
  primaryText: {
    color: Colors.textInverse,
    fontSize: Typography.body,
  },
  secondaryText: {
    color: Colors.text,
    fontSize: Typography.body,
  },
  ghostText: {
    color: Colors.primary,
    fontSize: Typography.body,
  },
  dangerText: {
    color: Colors.textInverse,
    fontSize: Typography.body,
  },
  
  smallText: {
    fontSize: Typography.bodySmall,
  },
  mediumText: {
    fontSize: Typography.body,
  },
  largeText: {
    fontSize: Typography.h4,
  },
  
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
