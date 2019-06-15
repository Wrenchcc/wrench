import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export const SearchUsersQuery = gql`
  query searchUsers($query: String!, $after: String, $type: SearchType!) {
    users: search(query: $query, after: $after, type: $type)
      @connection(key: "users", filter: ["query", "type"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...userInfo
          }
        }
      }
    }
  }
  ${userInfoFragment}
`

const searchUsersOptions = {
  options: ({ query = '' }) => ({
    variables: {
      query,
      type: 'USERS',
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('users'),
}

export const searchUsers = graphql(SearchUsersQuery, searchUsersOptions)
