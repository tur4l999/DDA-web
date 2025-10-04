/**
 * Library Screen - Books and PDFs / Kitablar və PDF-lər
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, EmptyState } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing['2xl'] * 2 - Spacing.md) / 2;

interface Book {
  id: string;
  title: string;
  cover: string;
  pages: number;
  progress: number;
}

const mockBooks: Book[] = [
  {
    id: 'b1',
    title: 'Yol Hərəkəti Qaydaları',
    cover: '📕',
    pages: 120,
    progress: 45,
  },
  {
    id: 'b2',
    title: 'Yol Nişanları',
    cover: '📗',
    pages: 80,
    progress: 100,
  },
  {
    id: 'b3',
    title: 'İlk Tibbi Yardım',
    cover: '📘',
    pages: 60,
    progress: 0,
  },
  {
    id: 'b4',
    title: 'Avtomobilin Quruluşu',
    cover: '📙',
    pages: 150,
    progress: 20,
  },
];

export const LibraryScreen: React.FC = () => {
  const { t } = useTranslation();

  const handleBookPress = (bookId: string) => {
    // TODO: Open PDF viewer / PDF görüntüləyici aç
    console.log('Open book:', bookId);
  };

  const renderBook = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => handleBookPress(item.id)}
    >
      <View style={styles.bookCover}>
        <Text style={styles.bookCoverEmoji}>{item.cover}</Text>
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookPages}>
          {item.pages} səhifə
        </Text>
        
        {item.progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockBooks}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <EmptyState
            title={t('library.noBooks')}
            description="Kitabxananıza kitab əlavə edin"
            icon={<Text style={{ fontSize: 64 }}>📚</Text>}
            actionLabel={t('library.addBooks')}
            onAction={() => console.log('Add books')}
          />
        }
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
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  bookCard: {
    width: cardWidth,
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookCover: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCoverEmoji: {
    fontSize: 64,
  },
  bookInfo: {
    padding: Spacing.md,
  },
  bookTitle: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bookPages: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    minWidth: 32,
    textAlign: 'right',
  },
});
