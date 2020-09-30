import React from 'react'
import withApollo from 'next-with-apollo'
import Router from 'next/router'
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import RefreshTokenLink from 'services/apollo/links/RefreshToken'
import AuthLink from 'services/apollo/links/Auth'
import HttpLink from 'services/apollo/links/Http'
import { isBrowser } from 'utils/platform'
import Cookie, { Cookies } from 'services/cookie'

export let client = null

export default withApollo(
  ({ initialState }) => {
    // const ACCESS_TOKEN = accessToken||Cookie.get(Cookies.ACCESS_TOKEN)
    const ACCESS_TOKEN = Cookie.get(Cookies.ACCESS_TOKEN)
    const autLink = AuthLink(ACCESS_TOKEN)

    client = new ApolloClient({
      ssrMode: isBrowser,
      connectToDevTools: isBrowser,
      // @ts-ignore
      link: ApolloLink.from([autLink, RefreshTokenLink, HttpLink]),
      cache: new InMemoryCache().restore(initialState || {}),
      name: 'web',
      version: process.env.BUILD_ID,
    })

    // @ts-ignore
    client.onResetStore(() => {
      Cookie.remove(Cookies.ACCESS_TOKEN)
      Cookie.remove(Cookies.REFRESH_TOKEN)
      Router.push('/')
    })

    return client
  },
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
    getDataFromTree,
  }
)
