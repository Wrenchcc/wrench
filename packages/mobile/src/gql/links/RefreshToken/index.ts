import { Observable } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { RefreshTokenDocument } from '@wrench/common'
import { getRefreshToken, setTokens } from 'utils/storage/auth'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { showToast } from 'navigation/banner'
import { ERROR_CODES, TOAST_TYPES } from 'utils/enums'
import { client } from '../../client'

function refreshTokenFailed() {
  client.clearStore()

  // TODO
  // Alert.alert('Your session has expired', 'Please login again.', null, {
  //   cancelable: false,
  // })

  track(events.REFRESH_TOKEN_FAILED)
}

export default onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const { extensions } = graphQLErrors[0]

    if (extensions && extensions.code === ERROR_CODES.SPAM) {
      showToast({ dismissAfter: 3000, type: TOAST_TYPES.SPAM })
    }

    if (extensions && extensions.code === ERROR_CODES.UNAUTHENTICATED) {
      return new Observable((observer) => {
        try {
          const refreshToken = getRefreshToken()
          const { headers } = operation.getContext()

          return client
            .mutate({
              mutation: RefreshTokenDocument,
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
                complete: observer.complete.bind(observer),
                error: observer.error.bind(observer),
                next: observer.next.bind(observer),
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
