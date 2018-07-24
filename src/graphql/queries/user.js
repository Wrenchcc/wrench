import gql from 'graphql-tag'

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    currentUser: currentUser @client {
      user {
        id
        avatarUrl
      }
      token
      refreshToken
    }
  }
`
