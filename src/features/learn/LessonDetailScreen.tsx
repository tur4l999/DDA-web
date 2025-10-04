/**
 * Lesson Detail Screen - Video player & content / Video oynadıcı və məzmun
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, Card } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useLearnStore } from '@/store/learnStore';
import * as Haptics from 'expo-haptics';

export const LessonDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { lessonId } = route.params as { lessonId: string };
  const { lessons, markLessonComplete, toggleDownload } = useLearnStore();
  
  const lesson = lessons[lessonId];

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Dərs tapılmadı</Text>
      </View>
    );
  }

  const handleMarkComplete = () => {
    markLessonComplete(lessonId);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  const handleDownload = () => {
    toggleDownload(lessonId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Video placeholder / Video yer tutucu */}
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.playIcon}>▶️</Text>
          <Text style={styles.videoText}>Video oynadıcı</Text>
          <Text style={styles.videoDuration}>
            {Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Text style={styles.actionIcon}>{lesson.downloaded ? '✓' : '⬇️'}</Text>
          <Text style={styles.actionText}>
            {lesson.downloaded ? 'Yüklənib' : 'Yüklə'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title & Description */}
      <Card style={styles.infoCard}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.duration}>
          {Math.floor(lesson.duration / 60)} dəqiqə
        </Text>
      </Card>

      {/* Key Points / Əsas məqamlar */}
      <Card style={styles.keyPointsCard}>
        <Text style={styles.sectionTitle}>{t('learn.keyPoints')}</Text>
        {lesson.keyPoints.map((point, index) => (
          <View key={index} style={styles.keyPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.keyPointText}>{point}</Text>
          </View>
        ))}
      </Card>

      {/* Complete Button */}
      {!lesson.completed && (
        <Button
          title={t('learn.markAsLearned')}
          onPress={handleMarkComplete}
          fullWidth
        />
      )}

      {lesson.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓ {t('learn.completed')}</Text>
        </View>
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
    paddingBottom: Spacing['3xl'],
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.text,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  videoText: {
    color: Colors.textInverse,
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
  },
  videoDuration: {
    color: Colors.textInverse,
    fontSize: Typography.bodySmall,
    marginTop: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionText: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
  infoCard: {
    marginHorizontal: Spacing['2xl'],
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  duration: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
  },
  keyPointsCard: {
    marginHorizontal: Spacing['2xl'],
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  keyPoint: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  bullet: {
    fontSize: Typography.body,
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  keyPointText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.text,
    lineHeight: 22,
  },
  completedBadge: {
    marginHorizontal: Spacing['2xl'],
    padding: Spacing.lg,
    backgroundColor: Colors.success,
    borderRadius: 12,
    alignItems: 'center',
  },
  completedText: {
    color: Colors.textInverse,
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
  },
});
