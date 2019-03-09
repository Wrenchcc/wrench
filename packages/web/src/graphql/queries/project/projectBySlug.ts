import gql from 'graphql-tag'
import postInfo from '../../fragments/post/postInfo'
import userInfoSmall from '../../fragments/user/userInfoSmall'

export const PROJECT_BY_SLUG = gql`
  query getProjectBySlug($slug: LowercaseString!, $after: String, $postId: ID) {
    post(id: $postId) {
      ...postInfo
    }
    project(slug: $slug) {
      id
      title
      slug
      dynamicLink
      commentsDisabled
      user {
        ...userInfoSmall
      }
      projectPermissions {
        isFollower
        isOwner
      }
      followers: followersConnection(first: 3) {
        totalCount
        edges {
          node {
            id
            username
            avatarUrl
          }
        }
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
              ...userInfoSmall
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
                    ...userInfoSmall
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
  ${postInfo}
  ${userInfoSmall}
`
