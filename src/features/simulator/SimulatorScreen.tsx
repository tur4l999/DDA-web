/**
 * Simulator Screen - Choose exam or practice mode / İmtahan və ya məşq rejimini seç
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useSimulatorStore } from '@/store/simulatorStore';
import { mockQuestions } from '@/services/mockData';

export const SimulatorScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { getBestScore, getAverageScore, history } = useSimulatorStore();

  const handleStartExam = () => {
    // Get 10 random questions / 10 təsadüfi sual götür
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    const examQuestions = shuffled.slice(0, 10);
    
    navigation.navigate('Exam' as never, { 
      mode: 'exam',
      questions: examQuestions 
    } as never);
  };

  const handleStartPractice = () => {
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    const practiceQuestions = shuffled.slice(0, 10);
    
    navigation.navigate('Exam' as never, { 
      mode: 'practice',
      questions: practiceQuestions 
    } as never);
  };

  const handleViewHistory = () => {
    navigation.navigate('History' as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Stats Card / Statistika kartı */}
      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>Statistikanız</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{getBestScore()}%</Text>
            <Text style={styles.statLabel}>{t('simulator.bestScore')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{getAverageScore()}%</Text>
            <Text style={styles.statLabel}>{t('simulator.averageScore')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{history.length}</Text>
            <Text style={styles.statLabel}>Cəhdlər</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.historyButton} onPress={handleViewHistory}>
          <Text style={styles.historyButtonText}>{t('simulator.history')} →</Text>
        </TouchableOpacity>
      </Card>

      {/* Exam Mode Card / İmtahan rejimi kartı */}
      <Card style={styles.modeCard}>
        <View style={styles.modeHeader}>
          <Text style={styles.modeEmoji}>🎯</Text>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>{t('simulator.examMode')}</Text>
            <Text style={styles.modeSubtitle}>{t('simulator.examRules')}</Text>
          </View>
        </View>
        
        <View style={styles.modeFeatures}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⏱</Text>
            <Text style={styles.featureText}>15 dəqiqə limit</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>❌</Text>
            <Text style={styles.featureText}>Geri qayıtmaq olmaz</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Real imtahan şəraiti</Text>
          </View>
        </View>

        <Button
          title={t('simulator.startExam')}
          onPress={handleStartExam}
          fullWidth
        />
      </Card>

      {/* Practice Mode Card / Məşq rejimi kartı */}
      <Card style={styles.modeCard}>
        <View style={styles.modeHeader}>
          <Text style={styles.modeEmoji}>📝</Text>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>{t('simulator.practiceMode')}</Text>
            <Text style={styles.modeSubtitle}>{t('simulator.practiceRules')}</Text>
          </View>
        </View>
        
        <View style={styles.modeFeatures}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⏸</Text>
            <Text style={styles.featureText}>Müddət limiti yoxdur</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💡</Text>
            <Text style={styles.featureText}>Dərhal izah alın</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureText}>Öyrənmək üçün ideal</Text>
          </View>
        </View>

        <Button
          title={t('simulator.startPractice')}
          onPress={handleStartPractice}
          variant="secondary"
          fullWidth
        />
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
  statsCard: {
    marginBottom: Spacing.xl,
  },
  statsTitle: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  historyButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  historyButtonText: {
    color: Colors.primary,
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
  },
  modeCard: {
    marginBottom: Spacing.lg,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modeEmoji: {
    fontSize: 48,
    marginRight: Spacing.lg,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  modeSubtitle: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
  },
  modeFeatures: {
    marginBottom: Spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  featureText: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
  },
});
