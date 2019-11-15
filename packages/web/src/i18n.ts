import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import * as humanFormat from 'human-format'
import resources from 'translations/index.json'
import { isBrowser } from './utils/platform'

export const SUPPORTED_LOCALS = ['en', 'sv']

const options = {
  debug: Boolean(process.env.DEBUG_TRANSLATION),
  defaultLanguage: 'en',
  fallbackLng: 'en',
  preload: SUPPORTED_LOCALS,
  resources,
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
  wait: isBrowser,
}

// for browser
if (isBrowser) {
  i18next.use(initReactI18next).use(LanguageDetector)
}

// initialize if not already initialized
if (!i18next.isInitialized) {
  i18next.init(options)
}

export default i18next
