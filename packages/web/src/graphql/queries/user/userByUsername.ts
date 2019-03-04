import gql from 'graphql-tag'
import userInfoSmall from '../../fragments/user/userInfoSmall'

export const USER_BY_USERNAME = gql`
  query getUserByUsername($username: LowercaseString!, $after: String) {
    user(username: $username) {
      id
      fullName
      firstName
      lastName
      avatarUrl
      isOnline
      projects: projectsConnection {
        edges {
          node {
            id
            title
            slug
            files: filesConnection(first: 1, type: IMAGE) {
              edges {
                node {
                  id
                  uri
                }
              }
            }
            followers: followersConnection {
              totalCount
            }
          }
        }
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
            project {
              id
              title
              slug
              commentsDisabled
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
  ${userInfoSmall}
`
