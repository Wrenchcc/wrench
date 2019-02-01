import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { client } from 'graphql/createClient'
import { RefreshTokenMutation } from 'graphql/mutations/user/refreshToken'
import { getTokens, setTokens } from 'graphql/utils/auth'
import { track, events } from 'utils/analytics'
import { resetNavigation } from 'navigation/actions'

function foreceSignOut() {
  client.resetStore()
  track(events.REFRESH_TOKEN_FAILED)
  resetNavigation()
}

export default onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const { extensions } = graphQLErrors[0]
    if (extensions && extensions.code === 'UNAUTHENTICATED') {
      return new Observable(async observer => {
        try {
          const refreshToken = await getTokens('refresh_token')
          const { headers } = operation.getContext()

          return client
            .mutate({
              mutation: RefreshTokenMutation,
              variables: { refreshToken },
            })
            .then(({ data }) => {
              const accessToken = data.token.access_token

              if (!accessToken) {
                track(events.REFRESH_TOKEN_FAILED)
                return foreceSignOut()
              }

              // Save new tokens to async storage
              setTokens({
                access_token: accessToken,
                refresh_token: refreshToken,
              })

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
            .catch(() => foreceSignOut())
        } catch (e) {
          observer.error(e)
        }

        return null
      })
    }
  }

  return null
})
