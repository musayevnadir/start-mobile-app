import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { Locale, LANG_CODES } from '../localization/IMLocalize';

interface LanguageInfo {
  flag: string;
  name: string;
}

const LANGUAGE_INFO: Record<Locale, LanguageInfo> = {
  en: { flag: '🇺🇸', name: 'English' },
  ru: { flag: '🇷🇺', name: 'Русский' },
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language as Locale,
  );

  const changeLanguage = async (language: string) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      await i18n.changeLanguage(language);
      setCurrentLanguage(language as Locale);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const switchLanguage = async (language: Locale) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error switching language:', error);
    }
  };

  const getLanguageInfo = (languageCode: Locale): LanguageInfo => {
    return LANGUAGE_INFO[languageCode] || LANGUAGE_INFO.en;
  };

  const availableLanguages: Locale[] = LANG_CODES as Locale[];

  const loadStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage');

      if (storedLanguage && storedLanguage !== i18n.language) {
        await i18n.changeLanguage(storedLanguage);
        setCurrentLanguage(storedLanguage as Locale);
      } else {
        setCurrentLanguage(i18n.language as Locale);
      }
    } catch (error) {
      console.error('Error loading stored language:', error);
    }
  };

  useEffect(() => {
    loadStoredLanguage();
  }, []);

  useEffect(() => {
    const onLanguageChange = (lng: string) => {
      setCurrentLanguage(lng as Locale);
    };

    i18n.on('languageChanged', onLanguageChange);

    return () => {
      i18n.off('languageChanged', onLanguageChange);
    };
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    switchLanguage,
    getLanguageInfo,
    availableLanguages,
  };
};
