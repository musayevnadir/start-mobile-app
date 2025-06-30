import React from 'react';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useThemeUtils } from 'hooks/useThemeUtils';
import { CommonStyles } from 'theme/common.styles';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const QuickThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, colors } = useThemeUtils();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text>{isDark ? '🌙' : '☀️'}</Text>
      <Text style={typography.FootnoteBold12}>{isDark ? 'Dark' : 'Light'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    gap: scale.horizontal(6),
    padding: scale.vertical(8),
    ...CommonStyles.alignCenterRow,
    borderRadius: scale.moderate(8),
  },
});
