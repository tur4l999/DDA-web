/**
 * Notifications Service - Push & local notifications / Push və lokal bildirişlər
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior / Bildiriş davranışını konfiqurasiya et
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  /**
   * Request permissions / İcazə istə
   */
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  }

  /**
   * Schedule daily study reminder / Gündəlik öyrənmə xatırlatması planlaşdır
   */
  async scheduleDailyReminder(hour: number, minute: number): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Öyrənmə vaxtı! 📚',
        body: 'Bu gün 5 dəqiqə öyrənməyiniz vaxtı gəldi',
        data: { type: 'daily_reminder' },
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  }

  /**
   * Send local notification / Lokal bildiriş göndər
   */
  async sendLocalNotification(title: string, body: string, data?: Record<string, unknown>): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
      },
      trigger: null, // Send immediately
    });
  }

  /**
   * Cancel all notifications / Bütün bildirişləri ləğv et
   */
  async cancelAll(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  /**
   * Get push token for backend / Backend üçün push token al
   */
  async getPushToken(): Promise<string | null> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#10B981',
      });
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token || null;
  }
}

export const notificationService = new NotificationService();
