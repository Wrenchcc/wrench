import gql from 'graphql-tag'

export const USER_BY_USERNAME = gql`
  query getUserByUsername($username: LowercaseString!) {
    user(username: $username) {
      id
      fullName
      avatarUrl
      isOnline
    }
  }
`
