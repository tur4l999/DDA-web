/**
 * Onboarding Screen - First-time user slides / İlk dəfə istifadəçi slaydları
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components';
import { Colors, Typography, Spacing, BorderRadius } from '@/design/tokens';
import { useSettingsStore } from '@/store/settingsStore';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  titleKey: string;
  descKey: string;
  emoji: string;
}

const slides: Slide[] = [
  {
    id: '1',
    titleKey: 'onboarding.slide1Title',
    descKey: 'onboarding.slide1Desc',
    emoji: '🎬',
  },
  {
    id: '2',
    titleKey: 'onboarding.slide2Title',
    descKey: 'onboarding.slide2Desc',
    emoji: '🎯',
  },
  {
    id: '3',
    titleKey: 'onboarding.slide3Title',
    descKey: 'onboarding.slide3Desc',
    emoji: '📱',
  },
  {
    id: '4',
    titleKey: 'onboarding.slide4Title',
    descKey: 'onboarding.slide4Desc',
    emoji: '🚗',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { setHasSeenOnboarding } = useSettingsStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSkip = async () => {
    await setHasSeenOnboarding(true);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleStart = async () => {
    await setHasSeenOnboarding(true);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
    if (viewableItems[0]?.index !== null && viewableItems[0]?.index !== undefined) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{t(item.titleKey)}</Text>
      <Text style={styles.description}>{t(item.descKey)}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      {/* Skip button / Keç düyməsi */}
      {!isLastSlide && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>{t('common.skip')}</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Dots & Button */}
      <View style={styles.footer}>
        {renderDots()}
        
        {isLastSlide ? (
          <Button
            title={t('onboarding.getStarted')}
            onPress={handleStart}
            fullWidth
          />
        ) : (
          <Button
            title={t('common.next')}
            onPress={handleNext}
            fullWidth
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: Spacing['2xl'],
    zIndex: 10,
    padding: Spacing.md,
  },
  skipText: {
    color: Colors.primary,
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
  },
  emoji: {
    fontSize: 80,
    marginBottom: Spacing['3xl'],
  },
  title: {
    fontSize: Typography.h1,
    fontWeight: Typography.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    fontSize: Typography.h4,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: Spacing['4xl'],
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
});
