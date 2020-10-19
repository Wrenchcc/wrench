import { ApolloClient, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { CachePersistor } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { SCHEMA_VERSION_KEY } from 'utils/storage/constants'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
import { AuthNavigation } from 'navigation'
import { readableVersion } from 'utils/appVersion'
import { isAndroid } from 'utils/platform'
import link from './links'

export let client = null

export default async function createClient() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          bookmarks: relayStylePagination(),
          collections: relayStylePagination(),
          comments: relayStylePagination(['postId']),
          followers: relayStylePagination(['projectId']),
          likes: relayStylePagination(['postId']),
          notifications: relayStylePagination(),
          posts: relayStylePagination(),
          projectCollections: relayStylePagination(['projectId']),
          projects: relayStylePagination(['typeId', 'type']),
          search: relayStylePagination(['query', 'type']),
          users: relayStylePagination(),
          models: relayStylePagination(),
          files: relayStylePagination(),
        },
      },
      Feed: {
        fields: {
          postsConnection: relayStylePagination(),
        },
      },
      Project: {
        fields: {
          postsConnection: relayStylePagination(),
          cover: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }
            },
          },
        },
      },
      Comment: {
        fields: {
          repliesConnection: relayStylePagination(),
        },
      },
      User: {
        fields: {
          postsConnection: relayStylePagination(),
          followingProjects: relayStylePagination(),
          settings: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }
            },
          },
        },
      },
    },
  })

  const persistor = new CachePersistor({
    cache,
    trigger: 'background',
    storage: AsyncStorage,
  })

  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === readableVersion) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore()
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge()
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, readableVersion)
  }

  client = new ApolloClient({
    cache,
    link,
    name: isAndroid ? 'Android' : 'iOS',
    version: readableVersion,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
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
