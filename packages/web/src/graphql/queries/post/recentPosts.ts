import gql from 'graphql-tag'

export const GET_RECENT_POSTS = gql`
  query getRecentPosts($after: String) {
    posts(after: $after) {
      edges {
        cursor
        node {
          id
          caption
          createdAt
          postPermissions {
            isOwner
          }
          user {
            id
            fullName
            firstName
            lastName
            username
            avatarUrl
            projectCount
            dynamicLink
            isOnline
          }
          project {
            id
            title
            slug
            dynamicLink
            commentsDisabled
            user {
              id
              fullName
              firstName
              lastName
              username
              avatarUrl
              projectCount
              dynamicLink
              isOnline
            }
            projectPermissions {
              isOwner
              isFollower
            }
            followers: followersConnection {
              totalCount
            }
          }
          files: filesConnection(type: IMAGE) {
            edges {
              node {
                type
                id
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
                createdAt
                user {
                  id
                  fullName
                  firstName
                  lastName
                  username
                  avatarUrl
                  projectCount
                  dynamicLink
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
