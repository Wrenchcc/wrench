import { AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const STORAGE_KEY = '@wrench:locale'

export const setLocale = locale => AsyncStorage.setItem(STORAGE_KEY, locale)

export const getLocale = async () => {
  const deviceLocale = DeviceInfo.getDeviceLocale()
  const savedLocale = await AsyncStorage.getItem(STORAGE_KEY)

  return savedLocale || deviceLocale
}

export const getTimezone = () => DeviceInfo.getTimezone()
