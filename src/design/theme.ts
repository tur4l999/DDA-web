/**
 * Theme Context & Hook
 * Tema konteksti və hook / Контекст темы и хук
 */

import { useColorScheme } from 'react-native';
import { Colors } from './tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

export const useAppTheme = () => {
  const systemScheme = useColorScheme();
  
  // TODO: Get theme preference from settings store
  // Əlçatanlıq: Parametrlərdən tema seçimini al
  const themeMode: ThemeMode = 'system';
  
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');
  
  return {
    isDark,
    colors: {
      primary: Colors.primary,
      primaryDark: Colors.primaryDark,
      text: isDark ? Colors.textInverse : Colors.text,
      textMuted: Colors.textMuted,
      bg: isDark ? Colors.bgDark : Colors.bg,
      card: isDark ? Colors.bgCardDark : Colors.bgCard,
      border: isDark ? Colors.borderDark : Colors.border,
      success: Colors.success,
      warning: Colors.warning,
      danger: Colors.danger,
    },
  };
};
