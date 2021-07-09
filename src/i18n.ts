import BigNumber from 'bignumber.js';
import { format as dateFormat } from 'date-fns';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  ns: ['landing', 'app'],
  defaultNS: 'app',
  nsSeparator: ':',
  resources: {
    en: {
      app: require('./assets/locales/en/app.json'),
      landing: require('./assets/locales/en/landing.json'),
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
    format: function (value, format, lng) {
      if (typeof value === 'number' && format === 'count') return new BigNumber(value).toFormat(0);
      if (format === 'uppercase') return value.toUpperCase();
      if (value instanceof Date && !!format) return dateFormat(value, format);
      return value;
    },
  },
});
