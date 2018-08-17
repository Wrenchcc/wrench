import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import HttpLink from './links/Http'
import { rehydrateAuthenticadedUser, removeAuthenticadedUser } from './utils/auth'

// TODO: Find better way to logout user
export let client = null

export default async function createClient() {
  if (client) return client

  const cache = new InMemoryCache()

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([HttpLink]),
  })

  await rehydrateAuthenticadedUser(client)

  client.onResetStore(() => {
    removeAuthenticadedUser()
  })

  return client
}
