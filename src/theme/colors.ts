/**
 * Color system for the application
 * Supports both light and dark themes with semantic color naming
 */

// Base color palette
const palette = {
  // Primary colors
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue900: '#1e3a8a',

  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Status colors
  green500: '#10b981',
  red500: '#ef4444',
  yellow500: '#f59e0b',
} as const;

// Light theme colors
export const lightColors = {
  // Background colors
  background: palette.white,
  backgroundSecondary: palette.gray50,
  surface: palette.white,
  surfaceSecondary: palette.gray100,

  // Text colors
  text: palette.gray900,
  textSecondary: palette.gray600,
  textTertiary: palette.gray400,

  // Primary colors
  primary: palette.blue600,
  primaryLight: palette.blue100,
  primaryDark: palette.blue700,

  // Border colors
  border: palette.gray200,
  borderLight: palette.gray100,

  // Status colors
  success: palette.green500,
  error: palette.red500,
  warning: palette.yellow500,

  // Interactive states
  pressed: palette.gray100,
  disabled: palette.gray300,
} as const;

// Dark theme colors
export const darkColors = {
  // Background colors
  background: palette.gray900,
  backgroundSecondary: palette.gray800,
  surface: palette.gray800,
  surfaceSecondary: palette.gray700,

  // Text colors
  text: palette.white,
  textSecondary: palette.gray300,
  textTertiary: palette.gray500,

  // Primary colors
  primary: palette.blue500,
  primaryLight: palette.blue900,
  primaryDark: palette.blue100,

  // Border colors
  border: palette.gray600,
  borderLight: palette.gray700,

  // Status colors
  success: palette.green500,
  error: palette.red500,
  warning: palette.yellow500,

  // Interactive states
  pressed: palette.gray700,
  disabled: palette.gray600,
} as const;

// Type definitions
export type ColorScheme = typeof lightColors;
export type ColorName = keyof ColorScheme;
