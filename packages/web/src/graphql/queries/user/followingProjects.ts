import gql from 'graphql-tag'

export const USER_FOLOWING_PROJECTS = gql`
  query getFollowingProjects($username: LowercaseString!) {
    user(username: $username) {
      id
      firstName
      following: followingProjects(first: 6) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            slug
            permissions {
              isFollower
              isOwner
            }
            user {
              id
              fullName
              username
              isOnline
            }
            cover {
              uri
            }
            files: filesConnection(first: 1, type: IMAGE) {
              edges {
                node {
                  id
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`

export const CURRENT_USER_FOLOWING_PROJECTS = gql`
  query getUserFollowingProjects {
    currentUser {
      id
      following: followingProjects(first: 5) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            slug
            user {
              id
              fullName
              username
            }
            files: filesConnection(first: 1, type: IMAGE) {
              edges {
                node {
                  id
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`
