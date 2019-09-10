import AsyncStorage from '@react-native-community/async-storage'
import DeviceLocale from 'react-native-device-locale'
import { SELECTED_LOCALE_KEY } from 'utils/storage/constants'

export const setLocale = locale => AsyncStorage.setItem(SELECTED_LOCALE_KEY, locale)

export const getLocale = async () => {
  const deviceLocale = DeviceLocale.deviceLocale

  const savedLocale = await AsyncStorage.getItem(SELECTED_LOCALE_KEY)

  return savedLocale || deviceLocale
}

export const timezone = DeviceLocale.timezone
