import fetchTranslation from './fetchTranslation'
import en from '@wrench/translations/src/locales/en/en.json'

const translationsCache = {
  en,
}

export default class FileBackend {
  type: 'backend'
  init() {}

  async read(locale, namespace, callback) {
    try {
      if (!(locale in translationsCache) && !__DEV__) {
        translationsCache[locale] = await fetchTranslation(locale)
      }

      const data = translationsCache[locale]

      const noTranslationAvailable = !Object.values(data[namespace]).some((x) => x !== null && x !== 'NO_TRANSLATION')

      // NOTE: Pass the chain so we fetch our API for translations
      if (noTranslationAvailable) {
        callback(null, null)
      } else {
        callback(null, data[namespace])
      }
    } catch (err) {
      console.warn(err)
      callback(null, null)
    }
  }
}
