import gql from 'graphql-tag'

export default gql`
  fragment followersInfo on FollowersConnection {
    edges {
      cursor
      node {
        id
        fullName
        avatarUrl
        projectCount
        isOnline
      }
    }
    pageInfo {
      hasNextPage
    }
  }
`
