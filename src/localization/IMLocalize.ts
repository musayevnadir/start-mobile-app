import i18n, { Module, ModuleType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from 'localization/langs/en.json';
import ru from 'localization/langs/ru.json';

const LANGUAGES = { en, ru };

export const LANG_CODES = Object.keys(LANGUAGES);
export type Locale = 'en' | 'ru';

interface ILanguageDetector extends Module {
  type: ModuleType;
  async: boolean;
  detect: (callback: (lang: string) => void) => void;
  init: () => void;
  cacheUserLanguage: (language: string) => void;
}

const languageDetector: ILanguageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    try {
      const storedLanguage = await AsyncStorage.getItem('language');

      if (!storedLanguage) {
        const bestLanguage =
          findBestLanguageTag(LANG_CODES)?.languageTag || 'ru';
        callback(bestLanguage);
        return;
      }
      callback(storedLanguage);
    } catch (error) {
      console.error('Error getting language from storage', error);
      const bestLanguage = findBestLanguageTag(LANG_CODES)?.languageTag || 'ru';
      callback(bestLanguage);
    }
  },
  init: () => {},
  cacheUserLanguage: async language => {
    try {
      await AsyncStorage.setItem('language', language);
    } catch (error) {
      console.error('Error setting language in local storage', error);
    }
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: 'ru',
    debug: __DEV__,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = async (language: Locale) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('language', language);
  } catch (error) {
    console.error('Error changing language', error);
  }
};

export const getCurrentLanguage = (): Locale => {
  return (i18n.language as Locale) || 'ru';
};

export default i18n;
