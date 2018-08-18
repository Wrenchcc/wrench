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
    interestedIn {
      id
    }
    projectsConnection {
      edges {
        node {
          id
          imagesConnection(first: 1) {
            edges {
              node {
                uri
              }
            }
          }
        }
      }
    }
  }
`
