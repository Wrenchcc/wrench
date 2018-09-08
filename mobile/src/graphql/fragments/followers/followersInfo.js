import gql from 'graphql-tag'

export default gql`
  fragment followersInfo on FollowersConnection {
    edges {
      node {
        id
        username
        fullName
        firstName
        lastName
        avatarUrl
        projectCount
        dynamicLink
      }
    }
    pageInfo {
      hasNextPage
    }
  }
`
