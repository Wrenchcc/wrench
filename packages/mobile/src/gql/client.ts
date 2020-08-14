import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CachePersistor } from 'apollo-cache-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { SCHEMA_VERSION_KEY } from 'utils/storage/constants'
import link from './links'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
import { AuthNavigation } from 'navigation'
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
    GoogleSignin.isSignedIn().then((isSignedIn) => isSignedIn && GoogleSignin.signOut())
    AuthNavigation()
  })

  return client
}
