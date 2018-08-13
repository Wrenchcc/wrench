import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export const searchUsersQuery = gql`
  query searchUsers($query: String!, $type: SearchType!) {
    users: search(query: $query, type: $type) {
      pageInfo {
        hasNextPage
      }
      edges {
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
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('users'),
}

export const searchUsers = graphql(searchUsersQuery, searchUsersOptions)
