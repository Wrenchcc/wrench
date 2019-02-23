import i18n from 'i18next'
import NextI18next from 'next-i18next'
import { WithNamespaces as OriginalWithNamespaces, Trans as OriginalTrans } from 'react-i18next'

// tslint:disable:no-var-requires
let detectionOrder = []
const use = []

if (typeof window === 'undefined') {
  const i18nextMiddleware = require('i18next-express-middleware')
  const languageDetector = new i18nextMiddleware.LanguageDetector(null, {
    order: ['enforcedLocale', 'languageByDomain'],
  })

  languageDetector.addDetector({
    name: 'enforcedLocale',
    lookup: () => process.env.ENFORCED_LOCALE,
    cacheUserLanguage: () => {},
  })

  languageDetector.addDetector({
    name: 'languageByDomain',
    lookup: opts => {
      const hostWithoutPort = (opts.headers.host || '').replace(/\:\d+$/, '')
      return hostWithoutPort === process.env.HOST_RU ? 'sv' : 'en'
    },
    cacheUserLanguage: () => {},
  })

  use.push(languageDetector)
  detectionOrder = ['enforcedLocale', 'languageByDomain']
}

export const nextI18next = new NextI18next({
  defaultLanguage: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  otherLanguages: ['sv'],
  localePath: '../translations',
  use,
  browserLanguageDetection: false,
  detection: {
    order: detectionOrder,
  },
})

export const includeDefaultNamespaces = namespaces => ['common', '_error'].concat(namespaces)

export const { appWithTranslation } = nextI18next
export const Trans = nextI18next.Trans as typeof OriginalTrans
export const { withNamespaces } = nextI18next // as typeof originalWithNamespaces;
export type TFunction = i18n.TFunction
export type I18n = i18n.i18n
export type WithNamespaces = OriginalWithNamespaces
