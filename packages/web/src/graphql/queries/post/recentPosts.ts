import gql from 'graphql-tag'

export const GET_RECENT_POSTS = gql`
  query getRecentPosts($after: String) {
    posts(after: $after) {
      edges {
        cursor
        node {
          id
          caption
          user {
            id
            username
            avatarUrl
            isOnline
          }
          project {
            id
            title
            slug
            commentsDisabled
          }
          files: filesConnection(type: IMAGE) {
            edges {
              node {
                id
                type
                uri
              }
            }
          }
          comments: commentsConnection(first: 2) {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                id
                text
                user {
                  id
                  fullName
                  username
                  avatarUrl
                  isOnline
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
