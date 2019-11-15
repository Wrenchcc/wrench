import gql from 'graphql-tag'

export const USER_FOOLOWING_PROJECTS = gql`
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
