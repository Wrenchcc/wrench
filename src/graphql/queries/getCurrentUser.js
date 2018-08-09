import gql from 'graphql-tag'

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    currentUser @client {
      id
      fullName
      firstName
      lastName
      avatarUrl
    }
  }
`
