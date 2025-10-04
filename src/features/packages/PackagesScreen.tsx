/**
 * Packages Screen - Premium plans & purchase / Premium planlar və alış
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input } from '@/components';
import { Colors, Typography, Spacing } from '@/design/tokens';
import { usePackagesStore } from '@/store/packagesStore';
import { mockPackages } from '@/services/mockData';

export const PackagesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { packages, currentPackage, setPackages, purchasePackage, redeemPromoCode } = usePackagesStore();
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  useEffect(() => {
    setPackages(mockPackages);
  }, []);

  const handlePurchase = async (packageId: string) => {
    const success = await purchasePackage(packageId);
    
    if (success) {
      Alert.alert(
        t('common.success'),
        'Paket uğurla alındı! 🎉',
        [{ text: t('common.close') }]
      );
    } else {
      Alert.alert(
        t('common.error'),
        'Ödəniş uğursuz oldu. Yenidən cəhd edin.',
        [{ text: t('common.retry') }]
      );
    }
  };

  const handleApplyPromo = async () => {
    const result = await redeemPromoCode(promoCode);
    
    if (result.success) {
      Alert.alert(
        t('common.success'),
        `${result.discount}% endirim tətbiq edildi!`,
        [{ text: t('common.close') }]
      );
      setPromoCode('');
      setShowPromoInput(false);
    } else {
      Alert.alert(
        t('common.error'),
        'Promo kod yanlışdır',
        [{ text: t('common.close') }]
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('packages.chooseYourPlan')}</Text>
        <Text style={styles.subtitle}>
          Bütün funksiyalara giriş əldə edin
        </Text>
      </View>

      {/* Packages */}
      {packages.map((pkg) => {
        const isCurrent = currentPackage === pkg.id;
        const isFree = pkg.price === 0;

        return (
          <Card 
            key={pkg.id} 
            style={[
              styles.packageCard,
              pkg.popular && styles.popularCard,
            ]}
          >
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>{t('packages.mostPopular')}</Text>
              </View>
            )}

            <View style={styles.packageHeader}>
              <Text style={styles.packageName}>{pkg.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {isFree ? t('packages.free') : `${pkg.price} ${pkg.currency}`}
                </Text>
                {pkg.priceMonthly && pkg.priceMonthly !== pkg.price && (
                  <Text style={styles.priceMonthly}>
                    {pkg.priceMonthly} AZN/ay
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.features}>
              {pkg.features.map((feature, index) => (
                <View key={index} style={styles.feature}>
                  <Text style={styles.featureIcon}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {isCurrent ? (
              <View style={styles.currentBadge}>
                <Text style={styles.currentText}>{t('packages.currentPlan')}</Text>
              </View>
            ) : (
              <Button
                title={isFree ? t('common.continue') : t('packages.buyNow')}
                onPress={() => handlePurchase(pkg.id)}
                variant={pkg.popular ? 'primary' : 'secondary'}
                fullWidth
              />
            )}
          </Card>
        );
      })}

      {/* Promo Code Section / Promo kod bölməsi */}
      <Card style={styles.promoCard}>
        <TouchableOpacity onPress={() => setShowPromoInput(!showPromoInput)}>
          <Text style={styles.promoTitle}>
            🎁 {t('packages.promoCode')} var?
          </Text>
        </TouchableOpacity>

        {showPromoInput && (
          <View style={styles.promoInput}>
            <Input
              placeholder={t('packages.enterCode')}
              value={promoCode}
              onChangeText={setPromoCode}
              containerStyle={styles.promoInputField}
            />
            <Button
              title={t('packages.applyCode')}
              onPress={handleApplyPromo}
              size="small"
            />
          </View>
        )}
      </Card>

      {/* Teacher Code Link / Müəllim kod linki */}
      <TouchableOpacity style={styles.teacherLink}>
        <Text style={styles.teacherLinkText}>
          👨‍🏫 {t('packages.teacherCode')} var? →
        </Text>
      </TouchableOpacity>
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
  packageCard: {
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  popularCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: Spacing.lg,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: Colors.textInverse,
    fontSize: Typography.caption,
    fontWeight: Typography.semibold,
  },
  packageHeader: {
    marginBottom: Spacing.lg,
  },
  packageName: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  price: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  priceMonthly: {
    fontSize: Typography.bodySmall,
    color: Colors.textMuted,
  },
  features: {
    marginBottom: Spacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  featureIcon: {
    fontSize: Typography.body,
    color: Colors.success,
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: Typography.bodySmall,
    color: Colors.text,
    lineHeight: 20,
  },
  currentBadge: {
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bg,
    borderRadius: 12,
    alignItems: 'center',
  },
  currentText: {
    color: Colors.primary,
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
  },
  promoCard: {
    marginBottom: Spacing.lg,
  },
  promoTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  promoInput: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.md,
  },
  promoInputField: {
    flex: 1,
    marginBottom: 0,
  },
  teacherLink: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  teacherLinkText: {
    fontSize: Typography.body,
    fontWeight: Typography.medium,
    color: Colors.primary,
  },
});
