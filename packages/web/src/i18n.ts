import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import * as i18nextMiddleware from 'i18next-express-middleware'
import * as humanFormat from 'human-format'
import resources from './translations/index.json'

export const SUPPORTED_LOCALS = ['en', 'sv']

const options = {
  resources,
  debug: Boolean(process.env.DEBUG_TRANSLATION),
  defaultLanguage: 'en',
  fallbackLng: 'en',
  preload: SUPPORTED_LOCALS,
  interpolation: {
    escapeValue: false,
    format(value, format) {
      if (format === 'humanFormat') {
        return humanFormat(value, {
          separator: '',
          decimals: 1,
        })
      }

      return value
    },
  },
  wait: process && !process.release,
}

// for browser
if (process && !process.release) {
  i18n.use(initReactI18next).use(LanguageDetector)
} else {
  i18n
    .use(initReactI18next)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      ...options,
      detection: {
        lookupQuerystring: 'hl',
      },
    })
}

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init(options)
}

export default i18n
