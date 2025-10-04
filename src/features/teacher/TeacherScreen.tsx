/**
 * Teacher Screen - Teacher mode activation / Müəllim rejimi aktivasiyası
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { usePackagesStore } from '@/store/packagesStore';

export const TeacherScreen: React.FC = () => {
  const { t } = useTranslation();
  const { redeemTeacherCode } = usePackagesStore();
  const [teacherKey, setTeacherKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  // Mock teacher data / Mock müəllim məlumatları
  const mockTeacherData = {
    keyStatus: 'active',
    validUntil: '31.12.2025',
    remainingSeats: 15,
    activatedStudents: 35,
  };

  const handleActivate = async () => {
    if (teacherKey.trim().length === 0) {
      Alert.alert(t('common.error'), 'Müəllim açarını daxil edin');
      return;
    }

    setLoading(true);
    const success = await redeemTeacherCode(teacherKey);
    setLoading(false);

    if (success) {
      setIsActivated(true);
      Alert.alert(
        t('common.success'),
        'Müəllim rejimi aktivləşdirildi! 🎉',
        [{ text: t('common.close') }]
      );
    } else {
      Alert.alert(
        t('common.error'),
        'Açar yanlışdır və ya müddəti bitib',
        [{ text: t('common.retry') }]
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.emoji}>👨‍🏫</Text>
        <Text style={styles.title}>{t('teacher.title')}</Text>
        <Text style={styles.subtitle}>
          Şagirdlərinizə premium giriş təqdim edin
        </Text>
      </View>

      {!isActivated ? (
        <>
          {/* Activation Input / Aktivasiya input */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{t('teacher.activationKey')}</Text>
            
            <Input
              placeholder="TEACHER-XXXX-XXXX"
              value={teacherKey}
              onChangeText={setTeacherKey}
              autoCapitalize="characters"
            />

            <Button
              title={t('teacher.activate')}
              onPress={handleActivate}
              loading={loading}
              fullWidth
            />

            <View style={styles.hint}>
              <Text style={styles.hintText}>
                💡 Demo üçün: <Text style={styles.hintCode}>TEACHER-DEMO-2025</Text>
              </Text>
            </View>
          </Card>

          {/* Benefits / Üstünlüklər */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Müəllim rejiminin üstünlükləri</Text>
            
            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>
                Şagirdləriniz üçün premium giriş
              </Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>
                Tələbə tərəqqisini izləmək
              </Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>
                Xüsusi açarlar yaratmaq
              </Text>
            </View>

            <View style={styles.benefit}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>
                Statistika və hesabatlar
              </Text>
            </View>
          </Card>
        </>
      ) : (
        <>
          {/* Teacher Dashboard / Müəllim idarə paneli */}
          <Card style={styles.card}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                ✓ {t('teacher.active')}
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statLabel}>{t('teacher.validUntil')}</Text>
              <Text style={styles.statValue}>{mockTeacherData.validUntil}</Text>
            </View>
          </Card>

          {/* Statistics / Statistika */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{t('teacher.analytics')}</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statBoxValue}>{mockTeacherData.remainingSeats}</Text>
                <Text style={styles.statBoxLabel}>{t('teacher.remainingSeats')}</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statBoxValue}>{mockTeacherData.activatedStudents}</Text>
                <Text style={styles.statBoxLabel}>{t('teacher.studentsActivated')}</Text>
              </View>
            </View>
          </Card>

          {/* Key Details / Açar təfərrüatları */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{t('teacher.keyDetails')}</Text>
            
            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Açar:</Text>
              <Text style={styles.detailValue}>{teacherKey}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={[styles.detailValue, { color: Colors.success }]}>
                Aktiv
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Tip:</Text>
              <Text style={styles.detailValue}>Premium</Text>
            </View>
          </Card>
        </>
      )}
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
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
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
  card: {
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  hint: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.bg,
    borderRadius: 8,
  },
  hintText: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  hintCode: {
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  benefitIcon: {
    fontSize: Typography.body,
    color: Colors.success,
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.text,
    lineHeight: 22,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.success,
    borderRadius: 12,
    marginBottom: Spacing.lg,
  },
  statusText: {
    color: Colors.textInverse,
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
  },
  stat: {
    paddingVertical: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
    marginBottom: Spacing.xs / 2,
  },
  statValue: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  statBox: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.bg,
    borderRadius: 12,
    alignItems: 'center',
  },
  statBoxValue: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statBoxLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: Typography.body,
    color: Colors.textMuted,
  },
  detailValue: {
    fontSize: Typography.body,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
});
