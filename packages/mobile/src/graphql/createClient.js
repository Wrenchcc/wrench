import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { removeTokens } from 'graphql/utils/auth'
import { track, events } from 'utils/analytics'
import { LoginManager } from 'react-native-fbsdk'
import { AuthNavigation } from 'navigation'
import AuthLink from './links/Auth'
import HttpLink from './links/Http'
import OfflineLink from './links/Offline'
import RefreshTokenLink from './links/RefreshToken'
import RetryLink from './links/Retry'

export let client = null

export default () => {
  if (client) {
    return client
  }

  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([RetryLink, OfflineLink, AuthLink, RefreshTokenLink, HttpLink]),
  })

  client.onResetStore(() => {
    track(events.USER_SIGNED_OUT)

    // TODO: Why is this flicker background?
    setTimeout(removeTokens, 100)

    AuthNavigation()

    // If switching accounts reset LoginManager
    // https://github.com/facebook/react-native-fbsdk/issues/279
    LoginManager.logOut()
  })

  return client
}
