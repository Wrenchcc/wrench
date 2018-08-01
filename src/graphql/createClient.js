import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import HttpLink from './links/Http'
import stateLink from './state'
import rehydrateStore from './utils/rehydrateStore'

export default async function createClient() {
  const cache = new InMemoryCache()

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink(cache), HttpLink]),
  })

  await rehydrateStore(client)

  client.onResetStore(() => {})

  return client
}
