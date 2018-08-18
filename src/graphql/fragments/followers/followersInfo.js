import gql from 'graphql-tag'

export default gql`
  fragment followersInfo on FollowersConnection {
    edges {
      node {
        id
        fullName
        firstName
        lastName
        avatarUrl
        projectCount
      }
    }
    pageInfo {
      hasNextPage
    }
  }
`
