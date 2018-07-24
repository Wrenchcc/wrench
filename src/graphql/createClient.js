import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import Config from 'react-native-config'
import stateLink from './state'

const cache = new InMemoryCache()

export default async () => {
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      stateLink(cache),
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) => console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          ))
        }
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      new HttpLink({
        uri: Config.GRAPHQL_URI,
        credentials: 'same-origin',
      }),
    ]),
  })

  client.writeData({
    data: {
      currentUser: {
        id: '123',
        token: '123',
        refreshToken: '123',
        avatarUrl:
          'https://scontent.farn1-1.fna.fbcdn.net/v/t1.0-1/p320x320/13626409_10154499229246953_5556140290385215343_n.jpg?_nc_cat=0&oh=97eb8b95c6c94dbfa64ed0227725043c&oe=5BCDCD76',
        __typename: 'Auth',
      },
    },
  })

  return client
}
