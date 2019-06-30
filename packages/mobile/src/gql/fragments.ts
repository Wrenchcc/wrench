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

//
// export const PROJECT_FRAGMENT = gql``
//
// export const POST_FRAGMENT = gql``
//
// export const COMMENT_FRAGMENT = gql``
//
// export const FILE_FRAGMENT = gql``
