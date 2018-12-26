import gql from 'graphql-tag'

export default gql`
  fragment repliesConnection on Comment {
    replies: repliesConnection {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          text
          createdAt
          user {
            id
            fullName
            username
            avatarUrl
          }
        }
      }
    }
  }
`
