import { useColorScheme } from 'react-native';
import { ThemeStorage } from 'utils/storage';
import { ThemeLoadingScreen } from 'components/ThemeLoadingScreen';
import { lightColors, darkColors, type ColorScheme } from './colors';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colors: ColorScheme;
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await ThemeStorage.loadThemeMode();
        setThemeMode(savedTheme);
      } catch (error) {
        console.warn('Failed to load saved theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedTheme();
  }, []);

  const handleThemeChange = async (mode: ThemeMode) => {
    setThemeMode(mode);
    await ThemeStorage.saveThemeMode(mode);
  };

  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' && systemColorScheme === 'dark');

  const colors = isDark ? darkColors : lightColors;

  if (isLoading) {
    return <ThemeLoadingScreen />;
  }

  const value: ThemeContextType = {
    colors,
    mode: themeMode,
    isDark,
    setThemeMode: handleThemeChange,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
