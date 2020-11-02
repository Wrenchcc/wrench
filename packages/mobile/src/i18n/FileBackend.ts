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
      if (!(locale in translationsCache)) {
        translationsCache[locale] = await fetchTranslation(locale)
      }

      const data = translationsCache[locale]
      const translations = data ? data[namespace] : null

      const noTranslationAvailable =
        translations &&
        !Object.values(translations).some((x) => x !== null && x !== 'NO_TRANSLATION')

      // NOTE: Pass the chain so we fetch our API for translations
      if (noTranslationAvailable) {
        callback(null, null)
      } else {
        callback(null, translations)
      }
    } catch (err) {
      console.warn(err)
      callback(null, null)
    }
  }
}
