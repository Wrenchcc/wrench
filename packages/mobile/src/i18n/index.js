import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import humanFormat from 'human-format'
import resources from 'translations/index.json'
import { getLocale } from './helpers'

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async cb => cb(await getLocale()),
  init: () => {},
  cacheUserLanguage: () => {},
}

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    debug: __DEV__,
    cache: {
      enabled: !__DEV__,
    },
    ns: ['common'],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    },
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
  })

export * from './helpers'
export * from './registerUserLocale'
export { default as languages } from './languages'
