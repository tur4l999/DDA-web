/**
 * Home Screen - Personalized dashboard / Fərdiləşdirilmiş idarə paneli
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Card, ProgressRing } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useAuthStore } from '@/store/authStore';
import { useLearnStore } from '@/store/learnStore';
import { useSimulatorStore } from '@/store/simulatorStore';
import { mockTopics, mockLessons, mockQuestions } from '@/services/mockData';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const { setTopics, setLessons, lessons } = useLearnStore();
  const { getBestScore, getAverageScore } = useSimulatorStore();

  useEffect(() => {
    // Load data on mount / Yükləmədə məlumatları yüklə
    setTopics(mockTopics);
    setLessons(mockLessons);
  }, []);

  const handleContinueLesson = () => {
    // Find first incomplete lesson / İlk tamamlanmamış dərsi tap
    const firstIncomplete = Object.values(lessons).find((l) => !l.completed);
    if (firstIncomplete) {
      navigation.navigate('Learn' as never, { 
        screen: 'LessonDetail', 
        params: { lessonId: firstIncomplete.id }
      } as never);
    }
  };

  const handleStartTest = () => {
    navigation.navigate('Simulator' as never);
  };

  const totalLessons = Object.keys(lessons).length;
  const completedLessons = Object.values(lessons).filter((l) => l.completed).length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Greeting / Salamlama */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {t('home.greeting')}, {user?.name || 'İstifadəçi'}! 👋
        </Text>
        <Text style={styles.dailyGoal}>{t('home.dailyGoal')}: 5 dəqiqə</Text>
      </View>

      {/* Progress Ring / Tərəqqi halqası */}
      <Card style={styles.progressCard}>
        <View style={styles.progressContent}>
          <ProgressRing progress={overallProgress} size={120} />
          <View style={styles.progressInfo}>
            <Text style={styles.progressTitle}>{t('home.yourProgress')}</Text>
            <Text style={styles.progressText}>
              {completedLessons} / {totalLessons} {t('learn.lessons')}
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{user?.streak || 0} 🔥</Text>
                <Text style={styles.statLabel}>{t('home.streak')}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{getBestScore()}%</Text>
                <Text style={styles.statLabel}>{t('home.lastScore')}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>

      {/* Quick Actions / Tez aksiyalar */}
      <Text style={styles.sectionTitle}>Tez keçidlər</Text>
      
      <TouchableOpacity onPress={handleContinueLesson}>
        <Card style={styles.actionCard}>
          <Text style={styles.actionEmoji}>📚</Text>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>{t('home.continueLesson')}</Text>
            <Text style={styles.actionSubtitle}>Davam et</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleStartTest}>
        <Card style={styles.actionCard}>
          <Text style={styles.actionEmoji}>🎯</Text>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>{t('home.startTest')}</Text>
            <Text style={styles.actionSubtitle}>10 sual · 15 dəq</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </Card>
      </TouchableOpacity>

      {/* Premium Promo / Premium promosyon */}
      <Card style={styles.promoCard}>
        <Text style={styles.promoEmoji}>💎</Text>
        <Text style={styles.promoTitle}>{t('home.explorePremium')}</Text>
        <Text style={styles.promoSubtitle}>
          Bütün dərslərə giriş, reklamsız təcrübə
        </Text>
        <TouchableOpacity 
          style={styles.promoButton}
          onPress={() => navigation.navigate('Packages' as never)}
        >
          <Text style={styles.promoButtonText}>Bax →</Text>
        </TouchableOpacity>
      </Card>
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
    marginBottom: Spacing['2xl'],
  },
  greeting: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  dailyGoal: {
    fontSize: Typography.body,
    color: Colors.textMuted,
  },
  progressCard: {
    marginBottom: Spacing['2xl'],
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  progressText: {
    fontSize: Typography.body,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
  sectionTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  actionEmoji: {
    fontSize: 32,
    marginRight: Spacing.lg,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  actionSubtitle: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
  },
  actionArrow: {
    fontSize: 32,
    color: Colors.textMuted,
  },
  promoCard: {
    backgroundColor: Colors.primary,
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  promoEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  promoTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.textInverse,
    marginBottom: Spacing.sm,
  },
  promoSubtitle: {
    fontSize: Typography.bodySmall,
    color: Colors.textInverse,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  promoButton: {
    backgroundColor: Colors.textInverse,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
  promoButtonText: {
    color: Colors.primary,
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
  },
});
