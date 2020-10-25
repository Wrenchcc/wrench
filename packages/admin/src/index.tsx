// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, Observable, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from '@apollo/link-context'
import { onError } from '@apollo/link-error'
import { RefreshTokenDocument } from '@wrench/common'

import App from './App'

const httpLink = new HttpLink({
  uri: 'https://api.wrench.cc/graphql',
  // uri: 'http://localhost:4000/graphql',
})

const refreshLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const { extensions } = graphQLErrors[0]
    if (extensions && extensions.code === 'UNAUTHENTICATED') {
      return new Observable(async (observer) => {
        try {
          const refreshToken = JSON.parse(window.localStorage.getItem('refresh_token'))
          const { headers } = operation.getContext()

          if (!refreshToken) {
            return null
          }

          return client
            .mutate({
              mutation: RefreshTokenDocument,
              variables: {
                refreshToken,
              },
            })
            .then(({ data }) => {
              const accessToken = data.token.access_token

              if (!accessToken) {
                return client.resetStore()
              }

              window.localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
              window.localStorage.setItem('access_token', JSON.stringify(accessToken))

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
          window.localStorage.removeItem('refresh_token')
          window.localStorage.removeItem('access_token')
          observer.error(err)
        }

        return null
      })
    }
  }

  return null
})

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('access_token'))
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          bookmarks: relayStylePagination(),
          collections: relayStylePagination(['id', 'projectId']),
          comments: relayStylePagination(['postId']),
          followers: relayStylePagination(['projectId']),
          likes: relayStylePagination(['postId']),
          notifications: relayStylePagination(),
          posts: relayStylePagination(),
          projectCollections: relayStylePagination(['projectId']),
          projects: relayStylePagination(['typeId', 'type']),
          search: relayStylePagination(['query', 'type']),
          users: relayStylePagination(),
          models: relayStylePagination(),
          files: relayStylePagination(),
        },
      },
      Feed: {
        fields: {
          postsConnection: relayStylePagination(),
        },
      },
      Project: {
        fields: {
          postsConnection: relayStylePagination(),
          cover: {
            merge: true,
          },
        },
      },
      Comment: {
        fields: {
          repliesConnection: relayStylePagination(),
        },
      },
      User: {
        fields: {
          postsConnection: relayStylePagination(),
          followingProjects: relayStylePagination(),
          settings: {
            merge: true,
          },
        },
      },
    },
  }),
  link: ApolloLink.from([authLink, refreshLink, httpLink]),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
