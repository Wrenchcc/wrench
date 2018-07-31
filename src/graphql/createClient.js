import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import HttpLink from './links/Http'
import AuthLink from './links/Auth'
import stateLink from './state'

export let client = null

export default async () => {
  if (client) return client

  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    // link: ApolloLink.from([stateLink(cache), AuthLink, HttpLink]),
    link: ApolloLink.from([stateLink(cache), HttpLink]),
  })

  // Purge persistor when the store was reset.
  // client.onResetStore(() => {
  //   persistor.purge()
  // })

  AuthLink.injectClient(client)

  return client
}
