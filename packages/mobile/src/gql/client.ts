import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import link from './links'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { AuthNavigation } from 'navigation'

const cache = new InMemoryCache({
  // cacheRedirects: {
  //   Query: {
  //     project: (_, args, { getCacheKey }) =>
  //       args.ids.map(id => getCacheKey({ __typename: 'Post', id: id })),
  //   },
  // },
})

const client = new ApolloClient({
  cache,
  link,
})

client.onClearStore(() => {
  track(events.USER_SIGNED_OUT)
  clearTokens()
  AuthNavigation()
  LoginManager.logOut()
})

export default client
