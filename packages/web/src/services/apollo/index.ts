import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import fetch from 'isomorphic-unfetch'
import Cookie, { Cookies } from 'services/cookie'
import { isBrowser } from 'utils/platform'

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

    return new ApolloClient({
      ssrMode: isBrowser,
      link: new BatchHttpLink({
        uri: process.env.API_ENDPOINT,
        fetch,
        headers: ACCESS_TOKEN ? { authorization: `Bearer ${ACCESS_TOKEN}` } : {},
      }),
      cache: new InMemoryCache().restore(initialState),
    })
  }
}

export default new Apollo()
