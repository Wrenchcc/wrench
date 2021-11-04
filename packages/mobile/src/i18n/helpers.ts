import { storage } from 'utils/storage'
import * as Localization from 'expo-localization'
import { SELECTED_LOCALE_KEY } from 'utils/storage/constants'

const getLanguagePartFromCode = (code) => {
  if (!code || code.indexOf('-') < 0) {
    return code
  }

  const p = code.split('-')
  return p[0]
}

export const setLocale = (locale) => storage.set(SELECTED_LOCALE_KEY, locale)

export const getLocale = () => {
  const deviceLocale = Localization.locale
  const savedLocale = storage.getString(SELECTED_LOCALE_KEY)

  return getLanguagePartFromCode(savedLocale || deviceLocale)
}

export const timezone = Localization.timezone
