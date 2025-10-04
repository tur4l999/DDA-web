/**
 * i18n Configuration / i18n Konfiqurasiya
 * Multi-language support with AZ default / Çoxdilli dəstək, AZ defolt
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import az from './az';
import en from './en';
import ru from './ru';

const resources = {
  az: { translation: az },
  en: { translation: en },
  ru: { translation: ru },
};

// Auto-detect device locale or default to AZ / Cihazın dilini avtomatik təyin et və ya AZ seç
const deviceLocale = Localization.locale.split('-')[0];
const supportedLocales = ['az', 'en', 'ru'];
const fallbackLocale = supportedLocales.includes(deviceLocale) ? deviceLocale : 'az';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: fallbackLocale,
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
