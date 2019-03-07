import { path } from 'ramda'
import cookies from 'next-cookies'

const ACCESS_TOKEN_KEY = 'access_token'

export const setAccessToken = token => (document.cookie = `${ACCESS_TOKEN_KEY}=${token}`)
export const removeAccessToken = () => (document.cookie = `${ACCESS_TOKEN_KEY}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`)

export const getAccessToken = (ctx = {}) => {
  const token = cookies(ctx)[ACCESS_TOKEN_KEY]
  if (!token) return null
  return token
}
