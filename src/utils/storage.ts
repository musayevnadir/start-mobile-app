import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from 'theme/ThemeContext';
import { User } from 'store/types';

const STORAGE_KEYS = {
  THEME_MODE: '@theme_mode',
  USER_DATA: '@user_data',
  IS_AUTHENTICATED: '@is_authenticated',
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

export const AuthStorage = {
  saveUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      await AsyncStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
    } catch (error) {
      console.warn('Failed to save user data:', error);
    }
  },

  loadUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.warn('Failed to load user data:', error);
      return null;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    try {
      const isAuth = await AsyncStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
      return isAuth === 'true';
    } catch (error) {
      console.warn('Failed to load auth status:', error);
      return false;
    }
  },

  clearAuth: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    } catch (error) {
      console.warn('Failed to clear auth data:', error);
    }
  },
};
