import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import { isBrowser } from '../utils/platform'
import AuthLink from './links/Auth'
import HttpLink from './links/Http'

let client

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  global.fetch = fetch
}

function create(initialState, tokens) {
  const autLink = AuthLink(tokens)

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([autLink, HttpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState, tokens) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, tokens)
  }

  // Reuse client on the client-side
  if (!client) {
    client = create(initialState, tokens)
  }

  return client
}
