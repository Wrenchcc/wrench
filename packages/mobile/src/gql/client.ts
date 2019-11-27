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
import { SCHEMA_VERSION_KEY } from 'utils/storage/constants'
import appVersion from 'utils/appVersion'

export let client = null

export default async function createClient() {
  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    trigger: 'background',
    storage: AsyncStorage,
  })

  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === appVersion) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore()
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge()
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, appVersion)
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
