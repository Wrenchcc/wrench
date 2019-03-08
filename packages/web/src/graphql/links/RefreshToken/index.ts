import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { REFRESH_TOKEN } from '../../mutations/user/refreshToken'
import { client } from '../../createClient'
import { getRefreshToken, setAccessToken, setRefreshToken } from '../../utils/auth'

export default onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const { extensions } = graphQLErrors[0]
    if (extensions && extensions.code === 'UNAUTHENTICATED') {
      return new Observable(async observer => {
        try {
          const refreshToken = await getRefreshToken()
          const { headers } = operation.getContext()

          return client
            .mutate({
              mutation: REFRESH_TOKEN,
              variables: { refreshToken },
            })
            .then(({ data }) => {
              const accessToken = data.token.access_token

              if (!accessToken) {
                return client.resetStore()
              }

              setAccessToken(accessToken)
              setRefreshToken(refreshToken)

              return operation.setContext(() => ({
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
            .catch(() => client.resetStore())
        } catch (err) {
          observer.error(err)
          // logError(err)
        }

        return null
      })
    }
  }

  return null
})
