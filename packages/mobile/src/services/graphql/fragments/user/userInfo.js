import { gql } from '@apollo/client'

// NOTE: Need dynamicLink
export default gql`
  fragment userInfo on User {
    id
    fullName
    firstName
    lastName
    username
    avatarUrl
    isSilhouette
    isOnline
    dynamicLink
    website
    location
    bio
  }
`
