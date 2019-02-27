import gql from 'graphql-tag'

export const PROJECT_BY_SLUG = gql`
  query getProjectBySlug($slug: LowercaseString!, $after: String, $postId: ID) {
    post(id: $postId) {
      id
      caption
      user {
        id
        fullName
        username
        avatarUrl
        isOnline
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
        totalCount
        edges {
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
    project(slug: $slug) {
      id
      title
      slug
      dynamicLink
      commentsDisabled
      user {
        id
        fullName
        username
        avatarUrl
        isOnline
      }
      followers: followersConnection {
        totalCount
      }
      type {
        title
      }
      posts: postsConnection(after: $after) {
        edges {
          cursor
          node {
            id
            caption
            user {
              id
              fullName
              username
              avatarUrl
              isOnline
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
              totalCount
              edges {
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
        totalCount
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`
