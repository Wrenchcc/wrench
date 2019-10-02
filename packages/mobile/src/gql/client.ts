import { ApolloClient } from 'apollo-client'
import AsyncStorage from '@react-native-community/async-storage'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import link from './links'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { AuthNavigation } from 'navigation'
import { SCHEMA_VERSION_KEY, SCHEMA_VERSION } from 'utils/storage/constants'

export let client = null

export default async function createClient() {
  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: AsyncStorage,
  })

  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore()
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge()
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  client = new ApolloClient({
    cache,
    link,
  })

  client.onClearStore(() => {
    track(events.USER_SIGNED_OUT)
    clearTokens()
    LoginManager.logOut()
    GoogleSignin.signOut()
    AuthNavigation()
  })

  return client
}
