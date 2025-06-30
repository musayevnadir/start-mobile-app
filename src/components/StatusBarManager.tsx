import React, { useEffect } from 'react';
import { useTheme } from 'theme/ThemeContext';
import { StatusBar, Platform } from 'react-native';

export const StatusBarManager: React.FC = () => {
  const { isDark, colors } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background, true);
      StatusBar.setTranslucent(true);
    }
  }, [isDark, colors.background]);

  return (
    <StatusBar
      barStyle={isDark ? 'light-content' : 'dark-content'}
      backgroundColor={
        Platform.OS === 'android' ? colors.background : undefined
      }
      translucent={Platform.OS === 'android'}
    />
  );
};
