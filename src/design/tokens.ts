/**
 * Design Tokens - DDA.az Mobile
 * Centralized design system values / Mərkəzi dizayn sistem dəyərləri
 */

export const Colors = {
  // Primary Brand / Əsas brend rəngləri
  primary: '#10B981',
  primaryDark: '#059669',
  primaryLight: '#34D399',
  
  // Text / Mətn rəngləri
  text: '#111827',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Background / Fon rəngləri
  bg: '#F9FAFB',
  bgDark: '#0B1220',
  bgCard: '#FFFFFF',
  bgCardDark: '#1F2937',
  
  // Semantic / Semantik rənglər
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  
  // UI Elements / UI elementləri
  border: '#E5E7EB',
  borderDark: '#374151',
  disabled: '#D1D5DB',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Typography = {
  // Font sizes / Şrift ölçüləri
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  bodySmall: 14,
  caption: 12,
  
  // Font weights / Şrift çəkiləri
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;

export const Animations = {
  timing: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  spring: {
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
} as const;
