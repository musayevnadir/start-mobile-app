import React from 'react';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme, type ThemeMode } from 'theme/ThemeContext';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
}

export const ThemeToggle: React.FC = () => {
  const { colors, mode, setThemeMode } = useTheme();
  const { t } = useTranslation();

  const themeOptions: ThemeOption[] = [
    { mode: 'light', label: t('THEME.LIGHT'), icon: '☀️' },
    { mode: 'dark', label: t('THEME.DARK'), icon: '🌙' },
    { mode: 'system', label: t('THEME.SYSTEM'), icon: '⚙️' },
  ];

  const handleThemeChange = (selectedMode: ThemeMode) => {
    setThemeMode(selectedMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('THEME.THEME_PREFERENCE')}
      </Text>
      <View style={styles.optionsContainer}>
        {themeOptions.map(option => (
          <TouchableOpacity
            key={option.mode}
            style={[
              styles.option,
              {
                backgroundColor:
                  mode === option.mode
                    ? colors.primary
                    : colors.backgroundSecondary,
                borderColor: colors.border,
              },
            ]}
            onPress={() => handleThemeChange(option.mode)}
          >
            <Text style={styles.icon}>{option.icon}</Text>
            <Text
              style={[
                typography.FootnoteBold12,
                {
                  color: mode === option.mode ? colors.surface : colors.text,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale.vertical(14),
    borderRadius: scale.moderate(12),
  },
  title: {
    ...typography.HeadlineBold18,
    marginBottom: scale.vertical(16),
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: scale.vertical(12),
  },
  option: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
  },
  icon: {
    ...typography.HeadlineRegular24,
    marginBottom: scale.vertical(8),
  },
});
