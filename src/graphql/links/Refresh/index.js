import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { client } from 'graphql/createClient'
import { refreshTokenMutation } from 'graphql/mutations/user/refreshToken'
import { getToken } from 'graphql/utils/auth'

// TODO: Sing out on failure
export default onError(({ graphQLErrors, operation, forward }) => {
  const { headers } = operation.getContext()
  const fetchNewAccessToken = async observer => {
    const refreshToken = await getToken('refreshToken')

    return client
      .mutate({
        mutation: refreshTokenMutation,
        variables: { refreshToken },
      })
      .then(({ data }) => {
        const { accessToken } = data.refreshToken.tokens

        if (!accessToken) {
          // Reset store (logout)
          // signOut()
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
        // signOut()
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
