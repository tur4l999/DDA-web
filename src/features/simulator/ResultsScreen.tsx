/**
 * Results Screen - Show exam results and review / İmtahan nəticələrini göstər və bax
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Button, Card } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useSimulatorStore } from '@/store/simulatorStore';

export const ResultsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { currentAttempt, clearCurrentAttempt } = useSimulatorStore();

  if (!currentAttempt || !currentAttempt.completedAt) {
    return null;
  }

  const isPassed = currentAttempt.score >= 70; // 70% passing score
  const wrongAnswers = currentAttempt.questions.filter(
    (q, idx) => currentAttempt.answers[idx] !== q.correctIndex
  );

  const handleTryAgain = () => {
    clearCurrentAttempt();
    navigation.navigate('SimulatorHome' as never);
  };

  const handleGoHome = () => {
    clearCurrentAttempt();
    navigation.navigate('Home' as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Result Card / Nəticə kartı */}
      <Card style={[styles.resultCard, isPassed ? styles.passedCard : styles.failedCard]}>
        <Text style={styles.resultEmoji}>{isPassed ? '🎉' : '😔'}</Text>
        <Text style={styles.resultTitle}>
          {isPassed ? t('simulator.passed') : t('simulator.failed')}
        </Text>
        <Text style={styles.scoreText}>
          {currentAttempt.score}%
        </Text>
        <Text style={styles.scoreLabel}>{t('simulator.score')}</Text>
      </Card>

      {/* Stats Card / Statistika kartı */}
      <Card style={styles.statsCard}>
        <Text style={styles.sectionTitle}>{t('simulator.results')}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentAttempt.totalQuestions}</Text>
            <Text style={styles.statLabel}>Cəmi sual</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.success }]}>
              {currentAttempt.correctAnswers}
            </Text>
            <Text style={styles.statLabel}>{t('simulator.correct')}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.danger }]}>
              {currentAttempt.totalQuestions - currentAttempt.correctAnswers}
            </Text>
            <Text style={styles.statLabel}>{t('simulator.wrong')}</Text>
          </View>
        </View>

        {currentAttempt.mode === 'exam' && (
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>{t('simulator.timeLeft')}:</Text>
            <Text style={styles.timeValue}>
              {Math.floor(currentAttempt.timeSpent / 60)}:{String(currentAttempt.timeSpent % 60).padStart(2, '0')}
            </Text>
          </View>
        )}
      </Card>

      {/* Wrong Answers Review / Səhv cavabların baxışı */}
      {wrongAnswers.length > 0 && (
        <Card style={styles.reviewCard}>
          <Text style={styles.sectionTitle}>{t('simulator.review')}</Text>
          
          {wrongAnswers.map((question, index) => {
            const questionIndex = currentAttempt.questions.indexOf(question);
            const userAnswer = currentAttempt.answers[questionIndex];
            
            return (
              <View key={question.id} style={styles.reviewItem}>
                <Text style={styles.reviewQuestionNumber}>
                  Sual {questionIndex + 1}
                </Text>
                <Text style={styles.reviewQuestionText}>{question.text}</Text>
                
                {userAnswer !== null && (
                  <View style={styles.answerRow}>
                    <Text style={styles.wrongAnswerLabel}>Sizin cavabınız:</Text>
                    <Text style={styles.wrongAnswerText}>
                      {question.options[userAnswer]}
                    </Text>
                  </View>
                )}
                
                <View style={styles.answerRow}>
                  <Text style={styles.correctAnswerLabel}>Düzgün cavab:</Text>
                  <Text style={styles.correctAnswerText}>
                    {question.options[question.correctIndex]}
                  </Text>
                </View>
                
                {question.explanation && (
                  <View style={styles.explanationBox}>
                    <Text style={styles.explanationLabel}>💡 {t('simulator.explanation')}:</Text>
                    <Text style={styles.explanationText}>{question.explanation}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </Card>
      )}

      {/* Action Buttons / Aksiya düymələri */}
      <Button
        title={t('simulator.tryAgain')}
        onPress={handleTryAgain}
        fullWidth
        style={styles.button}
      />
      
      <Button
        title="Ana səhifəyə qayıt"
        onPress={handleGoHome}
        variant="ghost"
        fullWidth
      />
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
  resultCard: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing['3xl'],
  },
  passedCard: {
    backgroundColor: Colors.success,
  },
  failedCard: {
    backgroundColor: Colors.danger,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  resultTitle: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.textInverse,
    marginBottom: Spacing.xl,
  },
  scoreText: {
    fontSize: 56,
    fontWeight: Typography.bold,
    color: Colors.textInverse,
  },
  scoreLabel: {
    fontSize: Typography.body,
    color: Colors.textInverse,
    opacity: 0.9,
  },
  statsCard: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
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
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  timeLabel: {
    fontSize: Typography.body,
    color: Colors.textMuted,
  },
  timeValue: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  reviewCard: {
    marginBottom: Spacing.xl,
  },
  reviewItem: {
    marginBottom: Spacing.xl,
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  reviewQuestionNumber: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  reviewQuestionText: {
    fontSize: Typography.body,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  answerRow: {
    marginBottom: Spacing.sm,
  },
  wrongAnswerLabel: {
    fontSize: Typography.caption,
    color: Colors.danger,
    marginBottom: Spacing.xs / 2,
  },
  wrongAnswerText: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
    backgroundColor: '#FEE2E2',
    padding: Spacing.sm,
    borderRadius: 8,
  },
  correctAnswerLabel: {
    fontSize: Typography.caption,
    color: Colors.success,
    marginBottom: Spacing.xs / 2,
  },
  correctAnswerText: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
    backgroundColor: '#D1FAE5',
    padding: Spacing.sm,
    borderRadius: 8,
  },
  explanationBox: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  explanationLabel: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  explanationText: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
    lineHeight: 20,
  },
  button: {
    marginBottom: Spacing.md,
  },
});
