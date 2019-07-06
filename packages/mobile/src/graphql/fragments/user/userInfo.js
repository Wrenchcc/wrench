import gql from 'graphql-tag'

// NOTE: Need dynamicLink
export default gql`
  fragment userInfo on User {
    id
    fullName
    username
    avatarUrl
    isOnline
    dynamicLink
  }
`
