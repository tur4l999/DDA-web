/**
 * History Screen - Past exam attempts / Keçmiş imtahan cəhdləri
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, EmptyState } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { useSimulatorStore } from '@/store/simulatorStore';
import { format } from 'date-fns';

export const HistoryScreen: React.FC = () => {
  const { t } = useTranslation();
  const { history } = useSimulatorStore();

  if (history.length === 0) {
    return (
      <EmptyState
        title="Tarixçə boşdur"
        description="Hələ test və ya imtahan verməmisiniz"
        icon={<Text style={{ fontSize: 64 }}>📊</Text>}
      />
    );
  }

  const renderItem = ({ item }: { item: typeof history[0] }) => {
    const isPassed = item.score >= 70;
    const date = format(new Date(item.startedAt), 'dd.MM.yyyy HH:mm');

    return (
      <Card style={styles.historyItem}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={styles.itemMode}>
              {item.mode === 'exam' ? '🎯 İmtahan' : '📝 Məşq'}
            </Text>
            <Text style={styles.itemDate}>{date}</Text>
          </View>
          
          <View style={[styles.scoreBadge, isPassed ? styles.passedBadge : styles.failedBadge]}>
            <Text style={styles.scoreText}>{item.score}%</Text>
          </View>
        </View>

        <View style={styles.itemStats}>
          <View style={styles.itemStat}>
            <Text style={styles.itemStatValue}>{item.totalQuestions}</Text>
            <Text style={styles.itemStatLabel}>Sual</Text>
          </View>
          
          <View style={styles.itemStat}>
            <Text style={[styles.itemStatValue, { color: Colors.success }]}>
              {item.correctAnswers}
            </Text>
            <Text style={styles.itemStatLabel}>Doğru</Text>
          </View>
          
          <View style={styles.itemStat}>
            <Text style={[styles.itemStatValue, { color: Colors.danger }]}>
              {item.totalQuestions - item.correctAnswers}
            </Text>
            <Text style={styles.itemStatLabel}>Səhv</Text>
          </View>

          {item.mode === 'exam' && (
            <View style={styles.itemStat}>
              <Text style={styles.itemStatValue}>
                {Math.floor(item.timeSpent / 60)}:{String(item.timeSpent % 60).padStart(2, '0')}
              </Text>
              <Text style={styles.itemStatLabel}>Vaxt</Text>
            </View>
          )}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  list: {
    padding: Spacing['2xl'],
  },
  historyItem: {
    marginBottom: Spacing.lg,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  itemMode: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  itemDate: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
  scoreBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  passedBadge: {
    backgroundColor: Colors.success,
  },
  failedBadge: {
    backgroundColor: Colors.danger,
  },
  scoreText: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.textInverse,
  },
  itemStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemStat: {
    alignItems: 'center',
  },
  itemStatValue: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs / 2,
  },
  itemStatLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
});
