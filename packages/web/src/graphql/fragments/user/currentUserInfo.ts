import gql from 'graphql-tag'

export default gql`
  fragment currentUserInfo on User {
    id
    fullName
    username
    avatarUrl
    isOnline
    interestedIn {
      id
    }
  }
`
