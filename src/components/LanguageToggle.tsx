import React, { Fragment, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme/ThemeContext';
import { scale } from 'theme/metrics';
import { typography } from 'theme/typograpy';
import { useLanguage } from 'hooks/useLanguage';
import { Locale } from 'localization/IMLocalize';
import { CommonStyles } from 'theme/common.styles';
import notifee from '@notifee/react-native';

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

  const testNotification = async () => {
    try {
      const settings = await notifee.getNotificationSettings();
      if (
        settings.authorizationStatus === 0 ||
        settings.authorizationStatus === 2
      ) {
        Alert.alert(
          t('NOTIFICATIONS.PERMISSIONS_TITLE'),
          t('NOTIFICATIONS.PERMISSIONS_MESSAGE'),
          [{ text: t('COMMON.OK') }],
        );
        return;
      }

      await onDisplayNotification();
    } catch (error) {
      console.error('Test notification error:', error);
      Alert.alert(t('COMMON.ERROR'), t('NOTIFICATIONS.DISPLAY_ERROR'), [
        { text: t('COMMON.OK') },
      ]);
    }
  };

  const onDisplayNotification = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'language_change',
        name: 'Language Change',
        description: 'Notifications for language changes',
        importance: 4,
      });

      await notifee.displayNotification({
        title: 'Start Mobile App 🚀',
        body: 'Добро пожаловать в наше мобильное приложение! Здесь вы можете легко переключать языки и наслаждаться удобным интерфейсом.',
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          color: '#007AFF',
          pressAction: {
            id: 'default',
          },
          importance: 4,
        },
        ios: {
          sound: 'default',
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

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
    <Fragment>
      <View style={styles.container}>
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
        <TouchableOpacity
          style={[styles.testButton, { backgroundColor: colors.primary }]}
          onPress={testNotification}
          activeOpacity={0.8}
        >
          <Text style={[typography.BodyMedium14, { color: colors.surface }]}>
            🔔 Test
          </Text>
        </TouchableOpacity>
      </View>
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
                      typography.BodyMedium14,
                      CommonStyles.flex,
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
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.alignCenterRow,
    gap: scale.horizontal(8),
  },
  testButton: {
    borderRadius: scale.moderate(8),
    paddingVertical: scale.vertical(8),
    paddingHorizontal: scale.horizontal(12),
    ...CommonStyles.alignCenterRow,
  },
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
});
