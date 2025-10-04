/**
 * Input Component - Text input field / Mətn daxiletmə sahəsi
 */

import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Typography, Spacing } from '@/design/tokens';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithLeftIcon, style]}
          placeholderTextColor={Colors.textLight}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.medium,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 48,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.body,
    color: Colors.text,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.sm,
  },
  leftIcon: {
    paddingLeft: Spacing.lg,
  },
  rightIcon: {
    paddingRight: Spacing.lg,
  },
  errorText: {
    fontSize: Typography.caption,
    color: Colors.danger,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});
