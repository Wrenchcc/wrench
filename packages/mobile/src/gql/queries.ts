import gql from 'graphql-tag'
import * as fragment from './fragments'

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
    publishers(first: 15) {
      edges {
        node {
          id
          name
          logoUrl
          url
          seen
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
            id
            logoUrl
            url
            seen
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

export const USER_QUERY = gql`
  query getUserByUsername($username: LowercaseString!, $after: String) {
    user(username: $username) {
      ...userFragment
      projects: projectsConnection {
        edges {
          node {
            id
            cover {
              uri
              default
            }
            title
            followers: followersConnection {
              totalCount
            }
          }
        }
      }
      posts: postsConnection(after: $after, first: 5) @connection(key: "posts") {
        edges {
          cursor
          node {
            ...postFragment
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${fragment.USER_FRAGMENT}
  ${fragment.POST_FRAGMENT}
`

export const CURRENT_USER_PROFILE_QUERY = gql`
  query getCurrentUser($after: String) {
    user: currentUser {
      ...userFragment
      projects: projectsConnection {
        edges {
          node {
            id
            cover {
              uri
              default
            }
            title
            followers: followersConnection {
              totalCount
            }
          }
        }
      }
      posts: postsConnection(after: $after, first: 5) @connection(key: "posts") {
        edges {
          cursor
          node {
            ...postFragment
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${fragment.USER_FRAGMENT}
  ${fragment.POST_FRAGMENT}
`

export const SIMILAR_PROJECTS_QUERY = gql`
  query similarProjects($id: ID!) {
    similarProjects(id: $id) {
      edges {
        node {
          cover {
            uri
          }
          ...projectFragment
        }
      }
    }
  }
  ${fragment.PROJECT_FRAGMENT}
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
