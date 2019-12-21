import gql from 'graphql-tag'
import * as fragment from './fragments'

export const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    user: currentUser {
      avatarUrl
      bio
      dynamicLink
      firstName
      fullName
      id
      isOnline
      isSilhouette
      lastName
      location
      projectCount
      username
      website
      settings {
        timezone
        locale
      }
      interestedIn {
        id
        title
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

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      ...postFragment
    }
  }
  ${fragment.POST_FRAGMENT}
`

export const GET_PROJECT_TYPES = gql`
  query getProjectTypes {
    types: projectTypes {
      id
      title
      imageUrl
    }
  }
`

export const GET_PROJECTS = gql`
  query getProjects($typeId: ID, $after: String, $first: Int, $type: ProjectSortType!) {
    projects(typeId: $typeId, after: $after, first: $first, type: $type) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          cover {
            uri
            default
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
