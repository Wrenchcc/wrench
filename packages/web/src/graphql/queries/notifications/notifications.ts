import gql from 'graphql-tag'

export const GET_NOTIFICATIONS = gql`
  query getNotifications($after: String) {
    notifications(after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          type
          createdAt
          user {
            isOnline
            fullName
            avatarUrl
          }
          project {
            id
            slug
            title
          }
          comment {
            id
            text
            postId
          }
        }
      }
    }
  }
`
