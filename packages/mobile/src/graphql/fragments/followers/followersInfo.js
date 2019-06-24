import gql from 'graphql-tag'

export default gql`
  fragment followersInfo on FollowersConnection {
    edges {
      cursor
      node {
        id
        username
        fullName
        avatarUrl
        isOnline
        projectCount
      }
    }
    pageInfo {
      hasNextPage
    }
  }
`
