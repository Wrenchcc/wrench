import { path } from 'ramda'
import cookies from 'next-cookies'

const STORAGE_KEY = '@wrench:tokens'

export const setTokens = value => (document.cookie = `${STORAGE_KEY}=${JSON.stringify(value)}`)
export const removeTokens = () => {}

// Can return specific token or both refresh_token and
// access_token if no name is provided
export const getTokens = (ctx = {}, name) => {
  const tokens = cookies(ctx)[STORAGE_KEY]
  if (!tokens) return null
  if (name) return path([name], JSON.parse(tokens))

  return JSON.parse(tokens)
}
