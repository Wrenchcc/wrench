import { AsyncStorage } from 'react-native'
import { path } from 'ramda'

const STORAGE_PREFIX = '@wrench:tokens'

export const setTokens = value => AsyncStorage.setItem(STORAGE_PREFIX, JSON.stringify(value))
export const removeTokens = () => AsyncStorage.removeItem(STORAGE_PREFIX)

// Can return specific token or both refreshToken and
// accessToken if no name is provided
export const getTokens = async name => {
  const tokens = await AsyncStorage.getItem(STORAGE_PREFIX)
  if (name) return path([name], JSON.parse(tokens))
  return JSON.parse(tokens)
}
