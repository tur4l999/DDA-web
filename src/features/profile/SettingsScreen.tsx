/**
 * Settings Screen - App preferences / Tətbiq parametrləri
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useSettingsStore, Language, ThemeMode } from '@/store/settingsStore';

export const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    language,
    theme,
    notificationsEnabled,
    studyReminderTime,
    downloadOnWifiOnly,
    setLanguage,
    setTheme,
    setNotifications,
    setWifiOnly,
    resetOnboarding,
    clearCache,
  } = useSettingsStore();

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'az', label: 'Azərbaycanca' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  const themes: { code: ThemeMode; label: string }[] = [
    { code: 'light', label: t('profile.light') },
    { code: 'dark', label: t('profile.dark') },
    { code: 'system', label: t('profile.system') },
  ];

  const handleLanguageChange = async (lang: Language) => {
    await setLanguage(lang);
    i18n.changeLanguage(lang);
    setShowLanguagePicker(false);
  };

  const handleThemeChange = async (newTheme: ThemeMode) => {
    await setTheme(newTheme);
    setShowThemePicker(false);
  };

  const handleNotificationsToggle = async (value: boolean) => {
    await setNotifications(value);
  };

  const handleWifiOnlyToggle = async (value: boolean) => {
    await setWifiOnly(value);
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      'Onboarding-i sıfırla',
      'Tətbiqi yenidən açdığınızda giriş slaydları göstəriləcək',
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.confirm'), 
          onPress: async () => {
            await resetOnboarding();
            Alert.alert('Uğurlu', 'Onboarding sıfırlandı');
          }
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      t('profile.clearCache'),
      'Bütün yüklənmiş videolar və şəkillər silinəcək',
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            await clearCache();
            Alert.alert('Uğurlu', 'Keş təmizləndi');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Language Settings / Dil parametrləri */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
        
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowLanguagePicker(!showLanguagePicker)}
        >
          <Text style={styles.settingLabel}>Dil / Language</Text>
          <Text style={styles.settingValue}>
            {languages.find((l) => l.code === language)?.label}
          </Text>
        </TouchableOpacity>

        {showLanguagePicker && (
          <View style={styles.picker}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.pickerItem,
                  language === lang.code && styles.pickerItemActive,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <Text style={[
                  styles.pickerItemText,
                  language === lang.code && styles.pickerItemTextActive,
                ]}>
                  {lang.label}
                </Text>
                {language === lang.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Card>

      {/* Theme Settings / Tema parametrləri */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t('profile.theme')}</Text>
        
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowThemePicker(!showThemePicker)}
        >
          <Text style={styles.settingLabel}>Görünüş</Text>
          <Text style={styles.settingValue}>
            {themes.find((t) => t.code === theme)?.label}
          </Text>
        </TouchableOpacity>

        {showThemePicker && (
          <View style={styles.picker}>
            {themes.map((t) => (
              <TouchableOpacity
                key={t.code}
                style={[
                  styles.pickerItem,
                  theme === t.code && styles.pickerItemActive,
                ]}
                onPress={() => handleThemeChange(t.code)}
              >
                <Text style={[
                  styles.pickerItemText,
                  theme === t.code && styles.pickerItemTextActive,
                ]}>
                  {t.label}
                </Text>
                {theme === t.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Card>

      {/* Notifications / Bildirişlər */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t('profile.notifications')}</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{t('profile.studyReminders')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.bgCard}
          />
        </View>

        {notificationsEnabled && (
          <View style={styles.subSetting}>
            <Text style={styles.subSettingLabel}>{t('profile.reminderTime')}</Text>
            <Text style={styles.subSettingValue}>{studyReminderTime}</Text>
          </View>
        )}
      </Card>

      {/* Downloads / Yükləmələr */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{t('profile.downloads')}</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{t('profile.wifiOnly')}</Text>
          <Switch
            value={downloadOnWifiOnly}
            onValueChange={handleWifiOnlyToggle}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.bgCard}
          />
        </View>
      </Card>

      {/* Advanced / Təkmilləşdirilmiş */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Təkmilləşdirilmiş</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleResetOnboarding}>
          <Text style={styles.settingLabel}>{t('profile.resetOnboarding')}</Text>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleClearCache}>
          <Text style={styles.settingLabel}>{t('profile.clearCache')}</Text>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>
      </Card>

      {/* Version / Versiya */}
      <View style={styles.version}>
        <Text style={styles.versionText}>
          {t('profile.version')} 1.0.0
        </Text>
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
    padding: Spacing['2xl'],
  },
  card: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  settingLabel: {
    fontSize: Typography.body,
    color: Colors.text,
  },
  settingValue: {
    fontSize: Typography.body,
    color: Colors.textMuted,
  },
  picker: {
    marginTop: Spacing.md,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.bg,
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerItemActive: {
    backgroundColor: Colors.primary + '10',
  },
  pickerItemText: {
    fontSize: Typography.body,
    color: Colors.text,
  },
  pickerItemTextActive: {
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },
  checkmark: {
    fontSize: Typography.h4,
    color: Colors.primary,
  },
  subSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingLeft: Spacing.xl,
  },
  subSettingLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
  },
  subSettingValue: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
    fontWeight: Typography.medium,
  },
  version: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  versionText: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
});
