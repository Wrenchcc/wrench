import gql from 'graphql-tag'

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    user: currentUser @client {
      id
      fullName
      firstName
      lastName
      avatarUrl
    }
  }
`
