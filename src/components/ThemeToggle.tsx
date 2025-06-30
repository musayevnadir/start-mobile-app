import React from 'react';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useTheme, type ThemeMode } from 'theme/ThemeContext';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
}

const themeOptions: ThemeOption[] = [
  { mode: 'light', label: 'Light', icon: '☀️' },
  { mode: 'dark', label: 'Dark', icon: '🌙' },
  { mode: 'system', label: 'System', icon: '⚙️' },
];

export const ThemeToggle: React.FC = () => {
  const { colors, mode, setThemeMode } = useTheme();

  const handleThemeChange = (selectedMode: ThemeMode) => {
    setThemeMode(selectedMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Theme Preference
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
    padding: scale.vertical(20),
    borderRadius: scale.moderate(12),
    margin: scale.vertical(16),
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
