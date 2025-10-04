/**
 * Learn Screen - Topics and lessons list / Mövzular və dərslər siyahısı
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useLearnStore } from '@/store/learnStore';
import { mockTopics, mockLessons } from '@/services/mockData';

export const LearnScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { topics, lessons, setTopics, setLessons, getTopicProgress } = useLearnStore();

  useEffect(() => {
    setTopics(mockTopics);
    setLessons(mockLessons);
  }, []);

  const getLessonsForTopic = (topicId: string) => {
    return Object.values(lessons).filter((l) => l.topicId === topicId);
  };

  const handleLessonPress = (lessonId: string) => {
    navigation.navigate('LessonDetail' as never, { lessonId } as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {topics.map((topic) => {
        const topicLessons = getLessonsForTopic(topic.id);
        const progress = getTopicProgress(topic.id);

        return (
          <Card key={topic.id} style={styles.topicCard}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicIcon}>{topic.iconName === 'traffic-light' ? '🚦' : topic.iconName === 'sign' ? '🪧' : topic.iconName === 'car' ? '🚗' : '🏥'}</Text>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicMeta}>
                  {topicLessons.length} {t('learn.lessons')} · {progress}%
                </Text>
              </View>
            </View>

            {/* Progress bar / Tərəqqi çubuğu */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            {/* Lessons */}
            {topicLessons.map((lesson, index) => (
              <TouchableOpacity
                key={lesson.id}
                onPress={() => handleLessonPress(lesson.id)}
                style={styles.lessonItem}
              >
                <View style={styles.lessonLeft}>
                  <Text style={styles.lessonNumber}>{index + 1}</Text>
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDuration}>
                      {Math.floor(lesson.duration / 60)} dəq
                    </Text>
                  </View>
                </View>
                
                {lesson.completed ? (
                  <Text style={styles.completedIcon}>✓</Text>
                ) : lesson.progress > 0 ? (
                  <Text style={styles.inProgressIcon}>⏸</Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </Card>
        );
      })}
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
  topicCard: {
    marginBottom: Spacing.xl,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  topicIcon: {
    fontSize: 40,
    marginRight: Spacing.lg,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  topicMeta: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.bg,
    color: Colors.text,
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
    textAlign: 'center',
    lineHeight: 32,
    marginRight: Spacing.md,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.medium,
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  lessonDuration: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
  completedIcon: {
    fontSize: 20,
    color: Colors.success,
  },
  inProgressIcon: {
    fontSize: 20,
    color: Colors.warning,
  },
});
