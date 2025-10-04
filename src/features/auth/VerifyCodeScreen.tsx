/**
 * Verify Code Screen - OTP verification / OTP təsdiq
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useAuthStore } from '@/store/authStore';

export const VerifyCodeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    
    // Validate code / Kodu yoxla
    if (code.length < 4) {
      setError('Kodu tam daxil edin');
      return;
    }

    setLoading(true);
    
    // TODO: Verify code with API / Kodu API ilə yoxla
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock success - create session / Mock uğur - sessiya yarat
    const mockUser = {
      id: '1',
      name: 'İstifadəçi',
      phone: '+994501234567',
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    const mockToken = 'mock_token_' + Date.now();
    
    await login(mockUser, mockToken);
    
    setLoading(false);
  };

  const handleResend = async () => {
    // TODO: Resend OTP / OTP yenidən göndər
    console.log('Resending code...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>📱</Text>
        <Text style={styles.title}>{t('auth.verifyCode')}</Text>
        <Text style={styles.subtitle}>{t('auth.enterCode')}</Text>
      </View>

      <View style={styles.form}>
        <Input
          label={t('auth.code')}
          placeholder="1234"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          error={error}
        />

        <Button
          title={t('auth.verifyCode')}
          onPress={handleVerify}
          loading={loading}
          fullWidth
        />

        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>{t('auth.resendCode')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['4xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  form: {
    marginTop: Spacing.xl,
  },
  resendButton: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  resendText: {
    color: Colors.primary,
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
  },
});
