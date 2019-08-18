import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
    fullName
    firstName
    lastName
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

export const PROJECT_FRAGMENT = gql`
  fragment projectFragment on Project {
    id
    title
    slug
    dynamicLink
    commentsDisabled
    user {
      ...userFragment
    }
    permissions {
      isOwner
      isFollower
    }
    followers: followersConnection {
      totalCount
    }
  }
  ${USER_FRAGMENT}
`

export const COMMENT_SMALL_FRAGMENT = gql`
  fragment commentSmallFragment on CommentConnection {
    totalCount
    edges {
      node {
        id
        text
        user {
          ...userFragment
        }
      }
    }
  }
  ${USER_FRAGMENT}
`

export const POST_FRAGMENT = gql`
  fragment postFragment on Post {
    id
    caption
    createdAt
    user {
      ...userFragment
    }
    permissions {
      isOwner
    }
    files: filesConnection(type: IMAGE) {
      edges {
        node {
          id
          type
          uri
        }
      }
    }
    project {
      ...projectFragment
    }
    likes {
      isLiked
      totalCount
    }
    comments: commentsConnection(first: 2) @connection(key: "comments") {
      ...commentSmallFragment
    }
  }
  ${PROJECT_FRAGMENT}
  ${USER_FRAGMENT}
  ${COMMENT_SMALL_FRAGMENT}
`

// export const FILE_FRAGMENT = gql``

//
// export const PROJECT_FRAGMENT = gql``
//
// export const POST_FRAGMENT = gql``
//
// export const COMMENT_FRAGMENT = gql``
//
// export const FILE_FRAGMENT = gql``
