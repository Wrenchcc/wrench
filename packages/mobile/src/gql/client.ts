import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import link from './links'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { AuthNavigation } from 'navigation'

const cache = new InMemoryCache({
  freezeResults: true,
})

const client = new ApolloClient({
  assumeImmutableResults: true,
  cache,
  link,
})

client.onResetStore(() => {
  track(events.USER_SIGNED_OUT)
  clearTokens()
  AuthNavigation()
  LoginManager.logOut()
})

export default client
