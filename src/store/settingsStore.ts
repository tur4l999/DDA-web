/**
 * Settings Store - User preferences / İstifadəçi parametrləri
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'az' | 'en' | 'ru';

interface SettingsState {
  hasSeenOnboarding: boolean;
  language: Language;
  theme: ThemeMode;
  notificationsEnabled: boolean;
  studyReminderTime: string; // HH:MM format
  downloadOnWifiOnly: boolean;
  
  // Actions / Aksiyalar
  setHasSeenOnboarding: (value: boolean) => Promise<void>;
  setLanguage: (lang: Language) => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
  setNotifications: (enabled: boolean) => Promise<void>;
  setReminderTime: (time: string) => Promise<void>;
  setWifiOnly: (value: boolean) => Promise<void>;
  loadSettings: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  clearCache: () => Promise<void>;
}

const SETTINGS_KEY = 'appSettings';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  hasSeenOnboarding: false,
  language: 'az',
  theme: 'system',
  notificationsEnabled: true,
  studyReminderTime: '20:00',
  downloadOnWifiOnly: true,
  
  setHasSeenOnboarding: async (value) => {
    set({ hasSeenOnboarding: value });
    await saveSettings(get());
  },
  
  setLanguage: async (lang) => {
    set({ language: lang });
    await saveSettings(get());
  },
  
  setTheme: async (theme) => {
    set({ theme });
    await saveSettings(get());
  },
  
  setNotifications: async (enabled) => {
    set({ notificationsEnabled: enabled });
    await saveSettings(get());
  },
  
  setReminderTime: async (time) => {
    set({ studyReminderTime: time });
    await saveSettings(get());
  },
  
  setWifiOnly: async (value) => {
    set({ downloadOnWifiOnly: value });
    await saveSettings(get());
  },
  
  loadSettings: async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        set(settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  },
  
  resetOnboarding: async () => {
    set({ hasSeenOnboarding: false });
    await saveSettings(get());
  },
  
  clearCache: async () => {
    // Clear cached lesson videos, images, etc.
    // Implementation depends on cache strategy
    console.log('Cache cleared');
  },
}));

async function saveSettings(state: SettingsState) {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}
