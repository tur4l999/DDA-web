/**
 * Exam Screen - Question display with timer / Sual göstərimi və taymer
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useSimulatorStore, Question } from '@/store/simulatorStore';

export const ExamScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { mode, questions } = route.params as { mode: 'exam' | 'practice'; questions: Question[] };
  
  const {
    currentAttempt,
    currentQuestionIndex,
    timeRemaining,
    startExam,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitExam,
    setTimeRemaining,
  } = useSimulatorStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    // Start exam on mount / Açılışda imtahana başla
    startExam(questions, mode);
  }, []);

  useEffect(() => {
    // Timer for exam mode / İmtahan rejimi üçün taymer
    if (mode === 'exam' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      
      return () => clearInterval(timer);
    } else if (mode === 'exam' && timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, mode]);

  useEffect(() => {
    // Load current answer / Cari cavabı yüklə
    if (currentAttempt) {
      setSelectedAnswer(currentAttempt.answers[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, currentAttempt]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    answerQuestion(index);
  };

  const handleNext = () => {
    nextQuestion();
    setSelectedAnswer(null);
  };

  const handlePrevious = () => {
    previousQuestion();
    setSelectedAnswer(null);
  };

  const handleSubmit = () => {
    submitExam();
    navigation.replace('Results' as never);
  };

  if (!currentAttempt) {
    return null;
  }

  const currentQuestion = currentAttempt.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentAttempt.questions.length - 1;
  const answeredCount = currentAttempt.answers.filter((a) => a !== null).length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header with timer / Taymerli başlıq */}
      <View style={styles.header}>
        <Text style={styles.questionCounter}>
          {t('simulator.question')} {currentQuestionIndex + 1} / {currentAttempt.questions.length}
        </Text>
        {mode === 'exam' && (
          <Text style={styles.timer}>
            ⏱ {formatTime(timeRemaining)}
          </Text>
        )}
      </View>

      {/* Progress bar / Tərəqqi çubuğu */}
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${((currentQuestionIndex + 1) / currentAttempt.questions.length) * 100}%` }
          ]} 
        />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Question text / Sual mətni */}
        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        {/* Options / Variantlar */}
        <View style={styles.options}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <View style={[styles.optionCircle, isSelected && styles.optionCircleSelected]}>
                  {isSelected && <View style={styles.optionCircleInner} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Navigation buttons / Naviqasiya düymələri */}
      <View style={styles.footer}>
        <View style={styles.navigation}>
          <Button
            title={t('common.back')}
            onPress={handlePrevious}
            variant="ghost"
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          />
          
          {isLastQuestion ? (
            <Button
              title={t('simulator.submit')}
              onPress={handleSubmit}
              disabled={answeredCount < currentAttempt.questions.length}
              style={styles.navButton}
            />
          ) : (
            <Button
              title={t('simulator.nextQuestion')}
              onPress={handleNext}
              style={styles.navButton}
            />
          )}
        </View>
        
        <Text style={styles.answeredCount}>
          {answeredCount} / {currentAttempt.questions.length} cavablandı
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.lg,
    paddingTop: Spacing['4xl'],
    backgroundColor: Colors.bgCard,
  },
  questionCounter: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  timer: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing['2xl'],
  },
  questionText: {
    fontSize: Typography.h3,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing['2xl'],
    lineHeight: 28,
  },
  options: {
    gap: Spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F0FDF4',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCircleSelected: {
    borderColor: Colors.primary,
  },
  optionCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.text,
  },
  optionTextSelected: {
    fontWeight: Typography.semibold,
  },
  footer: {
    padding: Spacing['2xl'],
    backgroundColor: Colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navigation: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  navButton: {
    flex: 1,
  },
  answeredCount: {
    textAlign: 'center',
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
});
