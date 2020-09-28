import gql from 'graphql-tag'
import userInfoSmall from '../../fragments/user/userInfoSmall'
import postInfo from '../../fragments/post/postInfo'

export const USER_BY_USERNAME = gql`
  query getUserByUsername($username: LowercaseString!, $after: String) {
    user(username: $username) {
      id
      fullName
      firstName
      lastName
      avatarUrl
      isOnline
      bio
      location
      website
      projects: projectsConnection(first: 4) {
        edges {
          node {
            id
            title
            slug
            cover {
              uri
            }
            followers: followersConnection {
              totalCount
            }
          }
        }
      }
      posts: postsConnection(first: 4, after: $after) {
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
