import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { useLanguage } from 'hooks/useLanguage';
import { CommonStyles } from 'theme/common.styles';

interface QuickLanguageToggleProps {
  style?: StyleProp<TextStyle>;
  textStyle?: TextStyle;
}

export const QuickLanguageToggle: React.FC<QuickLanguageToggleProps> = ({
  style,
  textStyle,
}) => {
  const { colors } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();

  const languageInfo = {
    en: { flag: '🇺🇸', name: 'English' },
    ru: { flag: '🇷🇺', name: 'Русский' },
  };

  const currentInfo =
    languageInfo[currentLanguage as keyof typeof languageInfo] ||
    languageInfo.en;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={toggleLanguage}
      activeOpacity={0.8}
    >
      <Text style={[styles.flag, { color: colors.text }, textStyle]}>
        {currentInfo.flag}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: scale.horizontal(8),
    paddingVertical: scale.vertical(4),
    borderRadius: scale.moderate(6),
    minWidth: scale.horizontal(32),
    minHeight: scale.vertical(32),
    ...CommonStyles.alignJustifyCenter,
  },
  flag: {
    textAlign: 'center',
    fontSize: scale.moderate(18),
  },
});
