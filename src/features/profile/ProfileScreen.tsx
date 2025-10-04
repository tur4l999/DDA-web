/**
 * Profile Screen - User profile and quick settings / İstifadəçi profili və tez parametrlər
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useAuthStore } from '@/store/authStore';
import { usePackagesStore } from '@/store/packagesStore';

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();
  const { currentPackage } = usePackagesStore();

  const handleLogout = () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('profile.logout'), style: 'destructive', onPress: logout },
      ]
    );
  };

  const menuItems = [
    { 
      id: 'settings',
      icon: '⚙️',
      label: t('profile.settings'),
      onPress: () => navigation.navigate('Settings' as never),
    },
    {
      id: 'teacher',
      icon: '👨‍🏫',
      label: t('teacher.title'),
      onPress: () => navigation.navigate('Teacher' as never),
    },
    {
      id: 'version',
      icon: 'ℹ️',
      label: t('profile.about'),
      subtitle: 'Version 1.0.0',
      onPress: () => console.log('About'),
    },
    {
      id: 'contact',
      icon: '💬',
      label: t('profile.contact'),
      subtitle: 'WhatsApp dəstək',
      onPress: () => console.log('Contact'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Card / Profil kartı */}
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        
        <Text style={styles.name}>{user?.name || 'İstifadəçi'}</Text>
        <Text style={styles.contact}>{user?.phone || user?.email}</Text>

        {currentPackage && (
          <View style={styles.packageBadge}>
            <Text style={styles.packageText}>
              💎 {currentPackage === 'premium' ? 'Premium' : currentPackage === 'standard' ? 'Standart' : 'Pulsuz'}
            </Text>
          </View>
        )}
      </Card>

      {/* Stats Card / Statistika kartı */}
      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.streak || 0} 🔥</Text>
            <Text style={styles.statLabel}>Ardıcıl gün</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Dərs tamamlandı</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Orta bal</Text>
          </View>
        </View>
      </Card>

      {/* Menu Items / Menyu elementləri */}
      <Card style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index !== menuItems.length - 1 && styles.menuItemBorder,
            ]}
            onPress={item.onPress}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.subtitle && (
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </Card>

      {/* Logout Button / Çıxış düyməsi */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('profile.logout')}</Text>
      </TouchableOpacity>
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
  profileCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarText: {
    fontSize: Typography.h1,
    fontWeight: Typography.bold,
    color: Colors.textInverse,
  },
  name: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  contact: {
    fontSize: Typography.body,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  packageBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bg,
    borderRadius: 12,
  },
  packageText: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  statsCard: {
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  menuCard: {
    marginBottom: Spacing.xl,
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: Spacing.lg,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.xs / 2,
  },
  menuArrow: {
    fontSize: 24,
    color: Colors.textMuted,
  },
  logoutButton: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
    color: Colors.danger,
  },
});
