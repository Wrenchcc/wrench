import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '@wrench:language'

export const setLanguage = lang => AsyncStorage.setItem(STORAGE_KEY, lang)
export const getLanguage = () => AsyncStorage.getItem(STORAGE_KEY)
