import cookies from 'next-cookies'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export const setAccessToken = token => (document.cookie = `${ACCESS_TOKEN_KEY}=${token}`)
export const removeAccessToken = () =>
  (document.cookie = `${ACCESS_TOKEN_KEY}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`)

export const setRefreshToken = token => (document.cookie = `${REFRESH_TOKEN_KEY}=${token}`)
export const removeRefreshToken = () =>
  (document.cookie = `${REFRESH_TOKEN_KEY}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`)

export const getAccessToken = (ctx = {}) => {
  const token = cookies(ctx)[ACCESS_TOKEN_KEY]
  if (!token) { return null }
  return token
}

export const getRefreshToken = (ctx = {}) => {
  const token = cookies(ctx)[REFRESH_TOKEN_KEY]
  if (!token) { return null }
  return token
}
