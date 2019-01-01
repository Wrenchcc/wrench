import * as i18n from 'i18n'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from 'shared/locale'

i18n.configure({
  defaultLocale: DEFAULT_LOCALE,
  directory: __dirname,
  locales: SUPPORTED_LOCALES,
})

export function translate({ key, params = {}, locale = DEFAULT_LOCALE }) {
  return i18n.__({ phrase: key, locale }, params)
}
