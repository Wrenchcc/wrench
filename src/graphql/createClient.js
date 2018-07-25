import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { CachePersistor } from 'apollo-cache-persist'
import Config from 'react-native-config'
import stateLink from './state'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'wrench-schema-version'

let client = null

export const resetStore = () => {
  client.resetStore()
}

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
    link: ApolloLink.from([
      stateLink(cache),
      new HttpLink({
        uri: Config.GRAPHQL_URI,
        credentials: 'same-origin',
      }),
    ]),
  })

  // Purge persistor when the store was reset.
  client.onResetStore(() => {
    persistor.purge()
  })

  await persistor.restore()

  return client
}
