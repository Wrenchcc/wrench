import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { removeTokens } from 'graphql-old/utils/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import AuthLink from './links/Auth'
import HttpLink from './links/Http'
import OfflineLink from './links/Offline'
import RefreshTokenLink from './links/RefreshToken'
import RetryLink from './links/Retry'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([RetryLink, OfflineLink, AuthLink, RefreshTokenLink, HttpLink]),
})

// client.onResetStore(() => {
//   track(events.USER_SIGNED_OUT)
//   removeTokens()
//
//   // If switching accounts reset LoginManager
//   // https://github.com/facebook/react-native-fbsdk/issues/279
//   LoginManager.logOut()
// })

export default client
