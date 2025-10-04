/**
 * Login Screen - Phone/Email authentication / Telefon/Email autentifikasiya
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    setError('');
    
    // Validate phone / Telefonu yoxla
    if (phone.length < 9) {
      setError('Düzgün telefon nömrəsi daxil edin');
      return;
    }

    setLoading(true);
    
    // TODO: Call API to send OTP / OTP göndərmək üçün API çağır
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    
    // Navigate to verify code screen / Kod təsdiq ekranına keç
    navigation.navigate('VerifyCode' as never, { phone } as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>🚗</Text>
        <Text style={styles.title}>DDA.az</Text>
        <Text style={styles.subtitle}>{t('auth.welcomeBack')}</Text>
      </View>

      <View style={styles.form}>
        <Input
          label={t('auth.phone')}
          placeholder="+994 XX XXX XX XX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={error}
        />

        <Button
          title={t('auth.sendCode')}
          onPress={handleSendCode}
          loading={loading}
          fullWidth
        />
      </View>

      {/* Social login placeholders / Sosial giriş placeholders */}
      <View style={styles.socialSection}>
        <Text style={styles.orText}>{t('auth.orContinueWith')}</Text>
        
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>🍎 {t('auth.apple')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>🔵 {t('auth.google')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['4xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  logo: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.h1,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.h4,
    color: Colors.textMuted,
  },
  form: {
    marginBottom: Spacing['3xl'],
  },
  socialSection: {
    marginTop: Spacing['2xl'],
  },
  orText: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: Typography.bodySmall,
    marginBottom: Spacing.lg,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  socialButton: {
    flex: 1,
    paddingVertical: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
  },
});
