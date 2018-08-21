import { path } from 'ramda'
import { setItem, getItem, removeItem } from 'utils/storage'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'schema-version'
const USER_STORAGE_KEY = 'user'
const TOKENS_STORAGE_KEY = 'tokens'

// Tokens
export const setTokens = tokens => setItem(TOKENS_STORAGE_KEY, tokens)
export const getToken = async name => path([name], await getItem(TOKENS_STORAGE_KEY))

// User
export const setAuthenticadedUser = data => setItem(USER_STORAGE_KEY, data)
export const getAuthenticadedUser = () => getItem(USER_STORAGE_KEY)

// Remove both user and tokens
export const removeAuthenticadedUser = () => {
  removeItem(USER_STORAGE_KEY)
  removeItem(TOKENS_STORAGE_KEY)
}

export const rehydrateAuthenticadedUser = async client => {
  // Read the current schema version from AsyncStorage.
  const currentVersion = await getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    const data = await getAuthenticadedUser()

    // If no user skip query and return
    if (!data) return

    client.writeQuery({
      query: getCurrentUserQuery,
      data: {
        currentUser: data,
      },
    })
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await removeAuthenticadedUser()
    await setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }
}
