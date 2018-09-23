import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { track, events } from 'utils/analytics'
import StateLink from './links/State'
import HttpLink from './links/Http'
import AuthLink from './links/Auth'
import RefreshLink from './links/Refresh'
import { removeTokens } from './utils/auth'

export let client = null

export default () => {
  if (client) return client

  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([StateLink(cache), AuthLink, RefreshLink, HttpLink]),
  })

  client.onResetStore(() => {
    track(events.USER_SIGNED_OUT)
    removeTokens()
  })

  return client
}
