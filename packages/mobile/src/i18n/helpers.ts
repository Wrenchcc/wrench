import AsyncStorage from '@react-native-community/async-storage'
import { NativeModules } from 'react-native'
import { isIphone } from 'utils/platform'
import { SELECTED_LOCALE_KEY } from 'utils/storage/constants'

export const setLocale = locale => AsyncStorage.setItem(SELECTED_LOCALE_KEY, locale)

export const getLocale = async () => {
  const deviceLocale = isIphone
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

  const savedLocale = await AsyncStorage.getItem(SELECTED_LOCALE_KEY)

  return savedLocale || deviceLocale
}

export const timezone = null // DeviceInfo.getTimezone()
