import * as i18n from 'i18n'
import { locales, defaultLocale } from 'shared/locale'

i18n.configure({
  defaultLocale,
  directory: __dirname,
  locales,
})

export function translate({ key, params = {}, locale = defaultLocale }) {
  return i18n.__({ phrase: key, locale }, params)
}
