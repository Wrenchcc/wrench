import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import AuthLink from './links/Auth'
import RefreshTokenLink from './links/RefreshToken'
import HttpLink from './links/Http'
import Router from 'next/router'
import Cookie, { Cookies } from 'services/cookie'
import { isBrowser } from 'utils/platform'

export let client = null

class Apollo {
  private client: ApolloClient<any>

  constructor() {
    this.client = this.createApolloClient()
  }

  public init(initialState = {}, accessToken?: string) {
    this.client = this.createApolloClient(initialState, accessToken)
  }

  public getClient() {
    return this.client
  }

  private createApolloClient(initialState = {}, accessToken?: string) {
    const ACCESS_TOKEN = accessToken || Cookie.get(Cookies.ACCESS_TOKEN)
    const autLink = AuthLink(ACCESS_TOKEN)

    client = new ApolloClient({
      ssrMode: isBrowser,
      connectToDevTools: isBrowser,
      link: ApolloLink.from([autLink, RefreshTokenLink, HttpLink]),
      cache: new InMemoryCache().restore(initialState),
    })

    // @ts-ignore
    client.onResetStore(() => {
      Cookie.remove(Cookies.ACCESS_TOKEN)
      Cookie.remove(Cookies.REFRESH_TOKEN)
      Router.push('/')
    })

    return client
  }
}

export default new Apollo()
