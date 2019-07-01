import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { clearTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { AuthNavigation } from 'navigation'
import AuthLink from './links/Auth'
import HttpLink from './links/Http'
import OfflineLink from './links/Offline'
import RefreshTokenLink from './links/RefreshToken'
import RetryLink from './links/Retry'

const cache = new InMemoryCache({
  freezeResults: true,
})

const client = new ApolloClient({
  assumeImmutableResults: true,
  cache,
  link: ApolloLink.from([RetryLink, OfflineLink, AuthLink, RefreshTokenLink, HttpLink]),
})

client.onResetStore(() => {
  track(events.USER_SIGNED_OUT)
  clearTokens()
  AuthNavigation()
  LoginManager.logOut()
})

export default client
