import { setItem, getItem, removeItem } from 'utils/storage'
import { path } from 'ramda'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'wrench-schema-version'
const STORAGE_KEY = '@wrench:user'

export const setAuthenticadedUser = data => setItem(STORAGE_KEY, data)
export const getAuthenticadedUser = () => getItem(STORAGE_KEY)
export const removeAuthenticadedUser = () => removeItem(STORAGE_KEY)
export const getToken = async name => {
  const authenticateUser = await getAuthenticadedUser()
  return path(['tokens', name], authenticateUser)
}

export const rehydrateAuthenticadedUser = async client => {
  // Read the current schema version from AsyncStorage.
  const currentVersion = await getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    const data = await getAuthenticadedUser()

    client.writeQuery({
      query: getCurrentUserQuery,
      data: {
        currentUser: {
          ...data.user,
        },
      },
    })
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await removeAuthenticadedUser()
    await setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }
}
