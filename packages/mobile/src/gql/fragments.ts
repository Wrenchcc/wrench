import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
    fullName
    username
    avatarUrl
    isOnline
  }
`

export const USER_SETTINGS_FRAGMENT = gql`
  fragment userSettingsFragment on User {
    id
    settings {
      notifications {
        types {
          NEW_FOLLOWER
          NEW_COMMENT
          NEW_MENTION
          NEW_ARTICLE
          SIMILAR_PROJECTS
          PRODUCT_ANNOUNCEMENTS
        }
      }
    }
  }
`

export const USER_PROJECTS_FRAGMENT = gql`
  fragment userProjectsFragment on User {
    projects: projectsConnection {
      edges {
        node {
          id
          title
          followers: followersConnection {
            totalCount
          }
          files: filesConnection(first: 1, type: IMAGE) {
            edges {
              node {
                uri
              }
            }
          }
        }
      }
    }
  }
`

// export const POST_FRAGMENT = gql`
//   fragment postFragment on Post {
//     id
//     caption
//     createdAt
//     postPermissions {
//       isOwner
//     }
//     user {
//       ...userFragment
//     }
//     files: filesConnection(type: IMAGE) {
//       edges {
//         node {
//           type
//           id
//           uri
//         }
//       }
//     }
//     project {
//       id
//       title
//       slug
//     }
//     comments: commentsConnection(first: 2) @connection(key: "comments") {
//       totalCount
//       edges {
//         node {
//           id
//           text
//           user {
//             ...userFragment
//           }
//         }
//       }
//     }
//   }
//   ${USER_FRAGMENT}
// `

//
// export const PROJECT_FRAGMENT = gql``
//
// export const POST_FRAGMENT = gql``
//
// export const COMMENT_FRAGMENT = gql``
//
// export const FILE_FRAGMENT = gql``

//
// export const PROJECT_FRAGMENT = gql``
//
// export const POST_FRAGMENT = gql``
//
// export const COMMENT_FRAGMENT = gql``
//
// export const FILE_FRAGMENT = gql``
