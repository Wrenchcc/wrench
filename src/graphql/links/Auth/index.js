import { ApolloLink, Observable } from 'apollo-link'
import { getToken, refreshToken } from 'graphql/utils/auth'

class AuthLink extends ApolloLink {
  tokenRefreshingPromise: null

  injectClient = client => {
    this.client = client
  }

  refreshToken = async () => {
    if (!this.tokenRefreshingPromise) {
      this.tokenRefreshingPromise = await refreshToken()
    }
    return this.tokenRefreshingPromise
  }

  setTokenHeader = async operation => {
    const token = await getToken()
    if (token) operation.setContext({ headers: { authorization: `Bearer ${token}` } })
  }

  request(operation, forward) {
    // set token in header
    this.setTokenHeader(operation)
    // try refreshing token once if it has expired
    return new Observable(observer => {
      let subscription
      let innerSubscription
      try {
        subscription = forward(operation).subscribe({
          next: observer.next.bind(observer),
          complete: observer.complete.bind(observer),
          error: netowrkError => {
            if (netowrkError.statusCode === 401) {
              this.refreshToken().then(success => {
                if (success) {
                  // set new token and retry operation
                  this.setTokenHeader(operation)
                  innerSubscription = forward(operation).subscribe(observer)
                } else {
                  // throw error
                  observer.error(new Error('jwt refresh failed'))
                }
              })
            } else {
              observer.error(netowrkError)
            }
          },
        })
      } catch (e) {
        observer.error(e)
      }
      return () => {
        if (subscription) subscription.unsubscribe()
        if (innerSubscription) innerSubscription.unsubscribe()
      }
    })
  }
}

export default new AuthLink()
