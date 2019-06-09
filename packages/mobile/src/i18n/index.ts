import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import humanFormat from 'human-format'
import resources from 'translations/index.json'
import { getLocale } from './helpers'

export * from './helpers'
export * from './registerUserLocale'
export { default as languages } from './languages'

const languageDetector = {
  async: true,
  cacheUserLanguage: () => null,
  detect: async cb => cb(await getLocale()),
  init: () => null,
  type: 'languageDetector',
}

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    cache: {
      enabled: !__DEV__,
    },
    debug: __DEV__,
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format(value, format) {
        if (format === 'humanFormat') {
          return humanFormat(value, {
            decimals: 1,
            separator: '',
          })
        }

        return value
      },
    },
    ns: ['common'],
    resources,
  })
