import i18next from 'i18next'
import Backend from 'i18next-chained-backend'
import HttpApi from 'i18next-http-backend'
import Config from 'react-native-config'
import { initReactI18next } from 'react-i18next'
import humanFormat from 'human-format'
import { locales, defaultLocale } from '@wrench/translations'
import { readableVersion } from 'utils/appVersion'
import { getLocale } from './helpers'
import FileBackend from './FileBackend'

const languageDetector = {
  async: true,
  cacheUserLanguage: () => null,
  detect: async (cb) => cb(await getLocale()),
  init: () => null,
  type: 'languageDetector',
}

// NOTE: We want fallback in production
let backends = [FileBackend, HttpApi]

// Note: We just want FileBackend in dev to notice missing keys
if (__DEV__) {
  backends = [FileBackend]
}

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    cache: {
      enabled: !__DEV__,
    },
    supportedLngs: locales,
    debug: Config.DEBUG_LANGUAGE === '1',
    fallbackLng: defaultLocale,
    nonExplicitSupportedLngs: true,
    lowerCaseLng: true,
    ns: 'common',
    react: {
      useSuspense: false,
      wait: true,
    },
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
    backend: {
      backends,
      backendOptions: [
        {},
        {
          allowMultiLoading: false,
          crossDomain: true,
          loadPath: 'https://wrench.cc/locales/{{lng}}/{{ns}}.json',
          queryStringParams: {
            v: readableVersion,
          },
        },
      ],
    },
  })

export * from './helpers'
export * from './registerUserLocale'
