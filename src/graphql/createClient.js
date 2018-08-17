import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import HttpLink from './links/Http'
import { rehydrateAuthenticadedUser, removeAuthenticadedUser, getToken } from './utils/auth'
import { getAccessTokenMutation } from './mutations/getAccessToken'

const signOut = () => console.log('sign out')

// TODO: Find better way to logout user
export let client = null

export default async function createClient() {
  if (client) return client

  const cache = new InMemoryCache()

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    const { headers } = operation.getContext()
    const fetchNewAccessToken = async observer => {
      const refreshToken = await getToken('refreshToken')

      return client
        .mutate({
          mutation: getAccessTokenMutation,
          variables: { refreshToken },
        })
        .then(({ data }) => {
          const { accessToken } = data.getAccessToken.tokens

          if (!accessToken) {
            // Reset store (logout)
            signOut()
          }

          operation.setContext(() => ({
            headers: {
              ...headers,
              authorization: `Bearer ${accessToken}`,
            },
          }))
        })
        .then(() => {
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          }

          return forward(operation).subscribe(subscriber)
        })
        .catch(() => {
          // Reset store (logout)
          signOut()
        })
    }

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.message === 'jwtExpired') {
          return new Observable(fetchNewAccessToken)
        }
      }
    }

    return null
  })

  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${await getToken('accessToken')}`,
    },
  }))

  client = new ApolloClient({
    cache,
    link: ApolloLink.from([authLink, errorLink, HttpLink]),
  })

  await rehydrateAuthenticadedUser(client)

  client.onResetStore(() => {
    removeAuthenticadedUser()
  })

  return client
}
