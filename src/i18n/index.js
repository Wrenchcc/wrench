import i18next from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import DeviceInfo from 'react-native-device-info'
import humanFormat from 'human-format'
import { getLanguage } from './helpers'

export * from './withLocalization'

const resources = require('translations/index.json')

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async cb => {
    const userLanguage = await getLanguage()
    if (userLanguage) {
      return cb(userLanguage)
    }
    return cb(DeviceInfo.getDeviceLocale())
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18next
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    resources,
    debug: __DEV__,
    cache: {
      enabled: !__DEV__,
    },
    ns: ['common'],
    defaultNS: 'common',
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
