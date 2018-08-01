import { AsyncStorage } from 'react-native'

const STORAGE_PREFIX = '@wrench:'

export const setItem = (key, value) => AsyncStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))

export const getItem = async key => {
  const item = await AsyncStorage.getItem(STORAGE_PREFIX + key)
  return JSON.parse(item)
}

export const removeItem = key => AsyncStorage.removeItem(STORAGE_PREFIX + key)
