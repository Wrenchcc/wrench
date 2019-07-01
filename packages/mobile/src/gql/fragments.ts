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
