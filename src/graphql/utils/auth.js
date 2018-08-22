import { path } from 'ramda'
import { setItem, getItem } from 'utils/storage'

const STORAGE_KEY = 'tokens'

// Tokens
export const setTokens = tokens => setItem(STORAGE_KEY, tokens)

// Can return specific token or both refreshToken and
// accessToken if no name is provided
export const getToken = async name => {
  const tokens = await getItem(STORAGE_KEY)
  if (name) return path([name], tokens)
  return tokens
}
