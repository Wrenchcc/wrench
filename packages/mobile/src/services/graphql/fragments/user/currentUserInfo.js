import { gql } from '@apollo/client'

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
    isSilhouette
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
