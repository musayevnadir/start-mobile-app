import { useTheme } from 'theme/ThemeContext';
import type { ThemeMode } from 'theme/ThemeContext';

export const useThemeUtils = () => {
  const { mode, setThemeMode, isDark, colors } = useTheme();

  const toggleTheme = () => {
    const newMode: ThemeMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const setLight = () => setThemeMode('light');
  const setDark = () => setThemeMode('dark');
  const setSystem = () => setThemeMode('system');

  const isLight = mode === 'light';
  const isSystemMode = mode === 'system';

  return {
    mode,
    isDark,
    isLight,
    isSystemMode,
    colors,

    setThemeMode,
    toggleTheme,
    setLight,
    setDark,
    setSystem,
  };
};
