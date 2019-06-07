import AsyncStorage from '@react-native-community/async-storage'
import { path } from 'ramda'

const STORAGE_KEY = '@wrench:tokens'

export const setTokens = value => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value))
export const removeTokens = () => AsyncStorage.removeItem(STORAGE_KEY)

// Can return specific token or both refresh_token and
// access_token if no name is provided
export const getTokens = async name => {
  const tokens = await AsyncStorage.getItem(STORAGE_KEY)
  if (name) { return path([name], JSON.parse(tokens)) }
  return JSON.parse(tokens)
}
