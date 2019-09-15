import gql from 'graphql-tag'

export default gql`
  fragment currentUserInfo on User {
    id
    fullName
    firstName
    lastName
    username
    avatarUrl
    projectCount
    dynamicLink
    isOnline
    website
    location
    bio
    settings {
      timezone
      locale
    }
    interestedIn {
      id
    }
  }
`
