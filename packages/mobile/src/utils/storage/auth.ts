import AsyncStorage from '@react-native-community/async-storage'
import { logError } from 'utils/sentry'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants'

export const setTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_KEY, accessToken],
      [REFRESH_TOKEN_KEY, refreshToken],
    ])
  } catch (error) {
    logError('Failed to setTokens')
  }
}

export const getAccessToken = async () => {
  try {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    logError(`Failed to get ${ACCESS_TOKEN_KEY}`)
  }
}

export const getRefreshToken = async () => {
  try {
    return AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  } catch (error) {
    logError(`Failed to get ${REFRESH_TOKEN_KEY}`)
  }
}

export const clearTokens = async () => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY])
  } catch (error) {
    logError('Failed to clearTokens')
  }
}
