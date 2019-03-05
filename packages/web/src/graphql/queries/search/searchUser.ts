import gql from 'graphql-tag'

export const SEARCH_USER = gql`
  query searchUser($query: String!, $after: String) {
    users: search(query: $query, after: $after, type: USERS) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            id
            fullName
            avatarUrl
            username
          }
        }
      }
    }
  }
`
