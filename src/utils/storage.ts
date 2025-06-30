import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from 'theme/ThemeContext';

const STORAGE_KEYS = {
  THEME_MODE: '@theme_mode',
} as const;

export const ThemeStorage = {
  saveThemeMode: async (mode: ThemeMode): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    } catch (error) {
      console.warn('Failed to save theme mode:', error);
    }
  },

  loadThemeMode: async (): Promise<ThemeMode> => {
    try {
      const savedMode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
      return (savedMode as ThemeMode) || 'system';
    } catch (error) {
      console.warn('Failed to load theme mode:', error);
      return 'system';
    }
  },

  clearThemeMode: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.THEME_MODE);
    } catch (error) {
      console.warn('Failed to clear theme mode:', error);
    }
  },
};
