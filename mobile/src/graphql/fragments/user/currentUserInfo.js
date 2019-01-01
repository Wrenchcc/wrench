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
    settings {
      locale
    }
    interestedIn {
      id
    }
  }
`
