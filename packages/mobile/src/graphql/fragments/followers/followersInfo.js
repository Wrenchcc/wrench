import gql from 'graphql-tag'

export default gql`
  fragment followersInfo on FollowersConnection {
    edges {
      cursor
      node {
        id
        username
        fullName
        firstName
        lastName
        avatarUrl
        isSilhouette
        isOnline
        projectCount
      }
    }
    pageInfo {
      hasNextPage
    }
  }
`
