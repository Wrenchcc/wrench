import i18next from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import DeviceInfo from 'react-native-device-info'
import humanFormat from 'human-format'

export * from './withLocalization'
export * from './helpers'

const resources = require('translations/index.json')

// TODO: Get user saved locale from asyncStorage
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    callback(DeviceInfo.getDeviceLocale())
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
    debug: false,
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
