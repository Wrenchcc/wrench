import fetchTranslations from './fetchTranslations'

export default class FileBackend {
  init() {}

  async read(languages, namespace, callback) {
    try {
      const data = await fetchTranslations(languages, namespace)

      const hasEmptyValues = !Object.values(data).some((x) => x !== null && x !== '')

      // NOTE: Pass the chain
      if (hasEmptyValues) {
        callback(null, null)
      } else {
        callback(null, data)
      }
    } catch (err) {
      console.warn(err)
      callback(null, null)
    }
  }
  type: 'backend'
}
