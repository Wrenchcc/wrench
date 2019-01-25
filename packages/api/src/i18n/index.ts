import * as i18n from 'i18n'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@wrench/shared'

i18n.configure({
  defaultLocale: DEFAULT_LOCALE,
  directory: __dirname,
  locales: SUPPORTED_LOCALES,
})

export function translate({ key, params = {}, locale }) {
  return i18n.__({ phrase: key, locale }, params)
}
