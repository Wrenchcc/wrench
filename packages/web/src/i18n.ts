import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const options = {
  resources: {
    en: {
      Header: {
        explore: 'Explore',
        feed: 'Feed',
      },
    },
    sv: {
      Header: {
        explore: 'Utforska',
        feed: 'Feed',
      },
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  wait: process && !process.release,
}

// for browser
if (process && !process.release) {
  i18n.use(initReactI18next).use(LanguageDetector)
}

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init(options)
}

export default i18n
