import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

import en from './locales/en.json';
import es from './locales/es.json';

// Asegurarnos de que los recursos se cargan correctamente
console.log('Recursos de traducción cargados:', {en, es});

const LANGUAGES = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const getDeviceLanguage = () => {
  let deviceLanguage;

  if (Platform.OS === 'ios') {
    deviceLanguage =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else {
    // Para Android, usamos el idioma del sistema
    deviceLanguage = NativeModules.I18nManager.localeIdentifier;
  }

  // Extraemos el código de idioma de dos letras
  const languageCode = deviceLanguage.substring(0, 2).toLowerCase();

  // Verificamos si tenemos traducciones para este idioma
  return LANGUAGES[languageCode] ? languageCode : 'en';
};

// Configuración de i18n
i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  debug: __DEV__, // Activar modo debug en desarrollo
  defaultNS: 'translation',
  keySeparator: '.',
  nsSeparator: false,
});

// Verificar que i18n se ha inicializado correctamente
console.log('i18n inicializado con idioma:', i18n.language);
console.log('Recursos disponibles:', i18n.options.resources);

// Función helper para verificar si una clave existe
export const hasTranslation = (key: string, options?: any) => {
  return i18n.exists(key, options);
};

export default i18n;
