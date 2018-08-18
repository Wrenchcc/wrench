import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import HttpLink from './links/Http'
import AuthLink from './links/Auth'
import RefreshLink from './links/Refresh'
import { rehydrateAuthenticadedUser, removeAuthenticadedUser } from './utils/auth'

export let client = null

export const signOut = () => client.cache.reset()

export default async function createClient() {
  if (client) return client

  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([AuthLink, RefreshLink, HttpLink]),
  })

  await rehydrateAuthenticadedUser(client)

  client.onResetStore(() => {
    removeAuthenticadedUser()
  })

  return client
}
