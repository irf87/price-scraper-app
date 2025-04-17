import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

import en from './locales/en.json';
import es from './locales/es.json';

const LANGUAGES = {
  en,
  es,
};

const getDeviceLanguage = () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return deviceLanguage.substring(0, 2);
};

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
