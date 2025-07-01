import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useLanguage } from 'hooks/useLanguage';
import { Locale } from 'localization/IMLocalize';
import { CommonStyles } from 'theme/common.styles';

const { width } = Dimensions.get('window');

interface LanguageOption {
  code: Locale;
  name: string;
  flag: string;
}

export const LanguageToggle: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const {
    currentLanguage,
    switchLanguage,
    getLanguageInfo,
    availableLanguages,
  } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const languages: LanguageOption[] = availableLanguages.map(
    (code: Locale) => ({
      code,
      name: code === 'en' ? t('LANGUAGE.ENGLISH') : t('LANGUAGE.RUSSIAN'),
      flag: getLanguageInfo(code).flag,
    }),
  );

  const handleLanguageChange = async (languageCode: Locale) => {
    try {
      await switchLanguage(languageCode);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const getCurrentLanguageInfo = (): LanguageOption => {
    return (
      languages.find((lang: LanguageOption) => lang.code === currentLanguage) ||
      languages[0]!
    );
  };

  const currentLangInfo = getCurrentLanguageInfo();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.languageButton,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.border,
          },
        ]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[typography.FootnoteBold12, { color: colors.text }]}>
          {currentLangInfo?.flag || '🇺🇸'}
        </Text>
        <Text style={[typography.BodyMedium14, { color: colors.text }]}>
          {currentLangInfo?.code.toUpperCase() || 'EN'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t('LANGUAGE.SWITCH_LANGUAGE')}
            </Text>

            <View style={styles.languagesList}>
              {languages.map((language: LanguageOption) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    {
                      backgroundColor:
                        currentLanguage === language.code
                          ? colors.primary
                          : colors.backgroundSecondary,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleLanguageChange(language.code)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      typography.HeadlineMedium18,
                      {
                        color:
                          currentLanguage === language.code
                            ? colors.surface
                            : colors.text,
                      },
                    ]}
                  >
                    {language.flag}
                  </Text>
                  <Text
                    style={[
                      styles.languageOptionText,
                      {
                        color:
                          currentLanguage === language.code
                            ? colors.surface
                            : colors.text,
                      },
                    ]}
                  >
                    {language.name}
                  </Text>
                  {currentLanguage === language.code && (
                    <Text
                      style={[
                        typography.HeadlineMedium16,
                        { color: colors.surface },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    borderWidth: 1,
    borderRadius: scale.moderate(8),
    paddingVertical: scale.vertical(8),
    paddingHorizontal: scale.horizontal(12),
    ...CommonStyles.alignCenterRow,
    gap: scale.horizontal(6),
    minWidth: scale.horizontal(60),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...CommonStyles.alignJustifyCenter,
  },
  modalContent: {
    borderWidth: 1,
    width: width * 0.8,
    padding: scale.vertical(24),
    maxWidth: scale.horizontal(300),
    borderRadius: scale.moderate(12),
  },
  modalTitle: {
    textAlign: 'center',
    ...typography.HeadlineMedium16,
    marginBottom: scale.vertical(20),
  },
  languagesList: {
    gap: scale.vertical(12),
  },
  languageOption: {
    borderWidth: 1,
    gap: scale.horizontal(12),
    padding: scale.vertical(16),
    borderRadius: scale.moderate(8),
    ...CommonStyles.justifyCenterRow,
  },
  languageOptionText: {
    flex: 1,
    ...typography.BodyMedium14,
  },
});
