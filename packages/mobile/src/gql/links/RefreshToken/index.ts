import { Alert } from 'react-native'
import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import client from 'gql/client'
import { REFRESH_TOKEN_MUTATION } from './mutations'
import { getRefreshToken, setTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'

function refreshTokenFailed() {
  client.resetStore()

  // TODO
  // Alert.alert('Your session has expired', 'Please login again.', null, {
  //   cancelable: false,
  // })

  track(events.REFRESH_TOKEN_FAILED)
}

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
              mutation: REFRESH_TOKEN_MUTATION,
              variables: { refreshToken },
            })
            .then(({ data }) => {
              const accessToken = data.token.access_token

              if (!accessToken) {
                track(events.REFRESH_TOKEN_FAILED)
                return refreshTokenFailed()
              }

              // Save new tokens to async storage
              setTokens(accessToken, refreshToken)

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
            .catch(() => refreshTokenFailed())
        } catch (err) {
          observer.error(err)
          logError(err)
        }

        return null
      })
    }
  }

  return null
})
