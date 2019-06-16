import AsyncStorage from '@react-native-community/async-storage'
import { logError } from 'utils/sentry'

const ACCESS_TOKEN = '@wrench:accessToken'
const REFRESH_TOKEN = '@wrench:refreshToken'

export const setTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.multiSet([[ACCESS_TOKEN, accessToken], [REFRESH_TOKEN, refreshToken]])
  } catch (error) {
    logError('Failed to setTokens')
  }
}

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN)
  } catch (error) {
    logError(`Failed to get ${ACCESS_TOKEN}`)
  }
}

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN)
  } catch (error) {
    logError(`Failed to get ${REFRESH_TOKEN}`)
  }
}

export const clearTokens = async (token, refreshToken) => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN])
  } catch (error) {
    logError('Failed to clearTokens')
  }
}
