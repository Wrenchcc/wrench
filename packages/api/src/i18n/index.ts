import translations from './translations'

export function translate({ key, params = {}, locale }) {
  return translations(locale, params)[key]
}
