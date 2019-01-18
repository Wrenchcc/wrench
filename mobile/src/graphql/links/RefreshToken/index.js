import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { client } from 'graphql/createClient'
import { RefreshTokenMutation } from 'graphql/mutations/user/refreshToken'
import { getTokens } from 'graphql/utils/auth'

export default onError(({ graphQLErrors, operation, forward }) => {
  const { headers } = operation.getContext()
  const fetchNewAccessToken = async observer => {
    const refreshToken = await getTokens('refreshToken')

    return client
      .mutate({
        mutation: RefreshTokenMutation,
        variables: { refreshToken },
      })
      .then(({ data }) => {
        const { accessToken } = data.refreshToken.tokens

        if (!accessToken) {
          client.resetStore()
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
        client.resetStore()
      })
  }

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message === 'token_expired') {
        return new Observable(fetchNewAccessToken)
      }
    }
  }

  return null
})
