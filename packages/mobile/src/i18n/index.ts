import i18next from 'i18next'
import Config from 'react-native-config'
import { initReactI18next } from 'react-i18next'
import humanFormat from 'human-format'
import { locales, defaultLocale } from '@wrench/translations'
import resources from 'translations/index.json'
import { getLocale } from './helpers'

export * from './helpers'
export * from './registerUserLocale'

export const languages = Object.keys(resources)

const languageDetector = {
  async: true,
  cacheUserLanguage: () => null,
  detect: async (cb) => cb(await getLocale()),
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
    supportedLngs: locales,
    debug: Config.DEBUG_LANGUAGE === '1',
    defaultNS: 'common',
    fallbackLng: defaultLocale,
    nonExplicitSupportedLngs: true,
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
    resources,
  })
