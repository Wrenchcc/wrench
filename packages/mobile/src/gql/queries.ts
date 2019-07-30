import gql from 'graphql-tag'
import * as fragment from './fragments'

// export const USER_QUERY = gql``
//
// export const USER_FOLLOWING_PROJECTS_QUERY = gql``

export const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    user: currentUser {
      id
      fullName
      firstName
      lastName
      username
      avatarUrl
      projectCount
      dynamicLink
      isOnline
      settings {
        timezone
        locale
      }
      interestedIn {
        id
      }
      ...userProjectsFragment
    }
  }
  ${fragment.USER_PROJECTS_FRAGMENT}
`

export const CURRENT_USER_SETTINGS_QUERY = gql`
  query getCurrentUserSettings {
    user: currentUser {
      ...userSettingsFragment
    }
  }
  ${fragment.USER_SETTINGS_FRAGMENT}
`

export const CURRENT_USER_PROJECTS_QUERY = gql`
  query getCurrentUserProjects {
    user: currentUser {
      ...userProjectsFragment
    }
  }
  ${fragment.USER_PROJECTS_FRAGMENT}
`

export const PUBLISHERS_QUERY = gql`
  query getPublishers {
    publishers {
      edges {
        node {
          id
          name
          logoUrl
          url
        }
      }
    }
  }
`

export const ARTICLES_QUERY = gql`
  query getArticles($publisherId: ID, $after: String, $first: Int) {
    articles(publisherId: $publisherId, first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          description
          url
          createdAt
          publisher {
            logoUrl
            url
          }
          files: filesConnection(first: 15) {
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
`

//
// export const COMMENT_QUERY = gql``
//
// export const COMMENTS_QUERY = gql``
//
//
// export const PROJECT_QUERY = gql``
//
// export const PROJECT_SUGGESTIONS_QUERY = gql``
//
// export const PROJECT_TYPES_QUERY = gql``
//
// export const SEARCH_MODELS_QUERY = gql``
//
// export const SEARCH_PROJECTS_QUERY = gql``
//
// export const SEARCH_USERS_QUERY = gql``
//
// export const EXPLORE_QUERY = gql``
//
// export const FEED_QUERY = gql``
//
// export const FOLLOWERS_QUERY = gql``
//
// export const NOTIFICATIONS_QUERY = gql``
