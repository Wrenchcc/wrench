import gql from 'graphql-tag'

export default gql`
  fragment userInfo on User {
    id
    fullName
    firstName
    lastName
    username
    avatarUrl
    projectCount
    dynamicLink
    isOnline
  }
`
