import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { track, events } from 'utils/analytics'
import HttpLink from './links/Http'
import AuthLink from './links/Auth'
import RefreshLink from './links/Refresh'
import createStore from './store/createStore'
import { removeTokens } from './utils/auth'

export let client = null

export default () => {
  if (client) return client

  const cache = new InMemoryCache()
  const StateLink = createStore(cache)

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([AuthLink, RefreshLink, StateLink, HttpLink]),
  })

  client.onResetStore(() => {
    track(events.USER_SIGNED_OUT)
    removeTokens()
  })

  return client
}
