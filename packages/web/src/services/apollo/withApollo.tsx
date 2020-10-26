import React from 'react'
import { relayStylePagination } from '@apollo/client/utilities'

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
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              // bookmarks: relayStylePagination(),
              // collections: relayStylePagination(['id', 'projectId']),
              // comments: relayStylePagination(['postId']),
              // followers: relayStylePagination(['projectId']),
              // likes: relayStylePagination(['postId']),
              // notifications: relayStylePagination(),
              // posts: relayStylePagination(),
              // projectCollections: relayStylePagination(['projectId']),
              // projects: relayStylePagination(['typeId', 'type']),
              // search: relayStylePagination(['query', 'type']),
              // users: relayStylePagination(),
              // models: relayStylePagination(),
              // files: relayStylePagination(),
              blogPosts: relayStylePagination(),
            },
          },
          // Feed: {
          //   fields: {
          //     postsConnection: relayStylePagination(),
          //   },
          // },
          // Project: {
          //   fields: {
          //     postsConnection: relayStylePagination(),
          //     cover: {
          //       merge: true,
          //     },
          //   },
          // },
          // Comment: {
          //   fields: {
          //     repliesConnection: relayStylePagination(),
          //   },
          // },
          // User: {
          //   fields: {
          //     postsConnection: relayStylePagination(),
          //     followingProjects: relayStylePagination(),
          //     settings: {
          //       merge: true,
          //     },
          //   },
          // },
        },
      }).restore(initialState || {}),
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
