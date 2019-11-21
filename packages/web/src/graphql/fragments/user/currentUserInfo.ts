import gql from 'graphql-tag'

export default gql`
  fragment currentUserInfo on User {
    id
    avatarUrl
    bio
    dynamicLink
    firstName
    fullName
    isOnline
    lastName
    location
    projectCount
    username
    website
    settings {
      timezone
      locale
    }
    interestedIn {
      id
    }
  }
`
