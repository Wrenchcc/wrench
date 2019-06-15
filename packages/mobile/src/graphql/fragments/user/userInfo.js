import gql from 'graphql-tag'

export default gql`
  fragment userInfo on User {
    id
    fullName
    username
    avatarUrl
    isOnline
  }
`
