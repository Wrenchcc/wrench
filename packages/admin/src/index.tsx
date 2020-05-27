// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
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
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, refreshLink, httpLink]),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
