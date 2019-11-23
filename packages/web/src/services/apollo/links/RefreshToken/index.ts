// @ts-nocheck
import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { REFRESH_TOKEN } from 'graphql/mutations/user/refreshToken'
import { client } from '../../'
import Cookie, { Cookies } from 'services/cookie'

export default onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const { extensions } = graphQLErrors[0]
    if (extensions && extensions.code === 'UNAUTHENTICATED') {
      return new Observable(async observer => {
        try {
          const refreshToken = Cookie.get(Cookies.REFRESH_TOKEN)
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

              Cookie.set(Cookies.ACCESS_TOKEN, accessToken)
              Cookie.set(Cookies.REFRESH_TOKEN, refreshToken)

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
            .catch(() => {
              client.resetStore()
            })
        } catch (err) {
          // TODO
          Cookie.remove(Cookies.ACCESS_TOKEN)
          Cookie.remove(Cookies.REFRESH_TOKEN)
          observer.error(err)
        }

        return null
      })
    }
  }

  return null
})
