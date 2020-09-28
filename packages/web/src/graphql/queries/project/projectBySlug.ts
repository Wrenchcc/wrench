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
      cover {
        uri
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
      permissions {
        isOwner
        isFollower
      }
      posts: postsConnection(after: $after) {
        edges {
          cursor
          node {
            ...postInfo
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
