import {useTranslation as useI18nTranslation} from 'react-i18next';

export const useTranslation = () => {
  const {t, i18n} = useI18nTranslation();

  const translate = (key: string, options?: any): string => {
    try {
      // Verificar si la clave existe
      const keyExists = i18n.exists(key, options);
      
      if (!keyExists) {
        console.warn(`Clave de traducción no encontrada: "${key}"`);
      }
      
      // Intentar obtener la traducción
      const translation = t(key, options);
      
      // Si la traducción es un string, la devolvemos
      if (typeof translation === 'string') {
        return translation;
      }
      
      // Si no es un string, intentamos con el idioma por defecto
      const defaultTranslation = t(key, {...options, lng: 'en'});
      if (typeof defaultTranslation === 'string') {
        return defaultTranslation;
      }
      
      // Si todo falla, devolvemos la clave original
      return key;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return key;
    }
  };

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      console.log(`Idioma cambiado a: ${language}`);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  return {
    t: translate,
    i18n,
    changeLanguage,
    getCurrentLanguage,
  };
}; 