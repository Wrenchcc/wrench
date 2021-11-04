import { storage } from 'utils/storage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants'

export const setTokens = (accessToken, refreshToken) => {
  storage.set(ACCESS_TOKEN_KEY, accessToken)
  storage.set(REFRESH_TOKEN_KEY, refreshToken)
}

export const getAccessToken = () => {
  return storage.getString(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
  return storage.getString(REFRESH_TOKEN_KEY)
}

export const clearTokens = () => {
  storage.delete(ACCESS_TOKEN_KEY)
  storage.delete(REFRESH_TOKEN_KEY)
}
