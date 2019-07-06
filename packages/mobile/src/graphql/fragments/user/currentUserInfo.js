import gql from 'graphql-tag'

export default gql`
  fragment currentUserInfo on User {
    id
    fullName
    username
    avatarUrl
    projectCount
    dynamicLink
    isOnline
    settings {
      timezone
      locale
    }
    interestedIn {
      id
    }
  }
`
