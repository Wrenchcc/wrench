import { ApolloClient, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { CachePersistor, MMKVWrapper } from 'apollo3-cache-persist'
import { storage } from 'utils/storage'
import { SCHEMA_VERSION_KEY } from 'utils/storage/constants'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk-next'
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
          collections: relayStylePagination(['id', 'projectId', 'slug', 'projectSlug']),
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
            merge: true,
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
            merge: true,
          },
        },
      },
    },
  })

  const persistor = new CachePersistor({
    cache,
    trigger: 'background',
    storage: new MMKVWrapper(storage),
  })

  // Read the current schema version from MMKV.
  const currentVersion = storage.getString(SCHEMA_VERSION_KEY)

  // NOTE: Disable cache in development
  if (!__DEV__) {
    if (currentVersion === readableVersion) {
      // If the current version matches the latest version,
      // we're good to go and can restore the cache.
      await persistor.restore()
    } else {
      // Otherwise, we'll want to purge the outdated persisted cache
      // and mark ourselves as having updated to the latest version.
      await persistor.purge()
      storage.set(SCHEMA_VERSION_KEY, readableVersion)
    }
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
