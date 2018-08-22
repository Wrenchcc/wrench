import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import HttpLink from './links/Http'
import AuthLink from './links/Auth'
import RefreshLink from './links/Refresh'

export let client = null

export default () => {
  if (client) return client

  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([AuthLink, RefreshLink, HttpLink]),
  })

  return client
}
