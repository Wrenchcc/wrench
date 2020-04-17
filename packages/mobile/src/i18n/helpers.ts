import AsyncStorage from '@react-native-community/async-storage'
import * as Localization from 'expo-localization'
import { SELECTED_LOCALE_KEY } from 'utils/storage/constants'

export const setLocale = locale => AsyncStorage.setItem(SELECTED_LOCALE_KEY, locale)

export const getLocale = async () => {
  const deviceLocale = Localization.locale

  const savedLocale = await AsyncStorage.getItem(SELECTED_LOCALE_KEY)

  return savedLocale || deviceLocale
}

export const timezone = Localization.timezone
