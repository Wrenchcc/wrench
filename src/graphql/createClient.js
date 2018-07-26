import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { CachePersistor } from 'apollo-cache-persist'
import HttpLink from './links/Http'
import AuthLink from './links/Auth'
import stateLink from './state'

const SCHEMA_VERSION = '2'
const SCHEMA_VERSION_KEY = 'wrench-schema-version'

export let client = null

export default async () => {
  if (client) return client

  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: AsyncStorage,
    debug: __DEV__,
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
    link: ApolloLink.from([stateLink(cache), AuthLink, HttpLink]),
  })

  // Purge persistor when the store was reset.
  client.onResetStore(() => {
    persistor.purge()
  })

  await persistor.restore()

  AuthLink.injectClient(client)

  return client
}
