import gql from 'graphql-tag'

export const PROJECT_BY_SLUG = gql`
  query getProjectBySlug($slug: LowercaseString!, $after: String, $postId: ID) {
    post(id: $postId) {
      id
      caption
      createdAt
      postPermissions {
        isOwner
      }
      user {
        id
        fullName
        firstName
        lastName
        username
        avatarUrl
        projectCount
        dynamicLink
        isOnline
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
      project {
        id
        title
        slug
        dynamicLink
        commentsDisabled
        user {
          id
          fullName
          firstName
          lastName
          username
          avatarUrl
          projectCount
          dynamicLink
          isOnline
        }
        projectPermissions {
          isOwner
          isFollower
        }
        followers: followersConnection {
          totalCount
        }
      }
      comments: commentsConnection(first: 2) {
        totalCount
        edges {
          node {
            id
            text
            user {
              id
              fullName
              firstName
              lastName
              username
              avatarUrl
              projectCount
              dynamicLink
              isOnline
            }
          }
        }
      }
    }
    project(slug: $slug) {
      id
      title
      slug
      dynamicLink
      commentsDisabled
      user {
        id
        fullName
        firstName
        lastName
        username
        avatarUrl
        projectCount
        dynamicLink
        isOnline
      }
      projectPermissions {
        isOwner
        isFollower
      }
      followers: followersConnection {
        totalCount
      }
      posts: postsConnection(after: $after) {
        edges {
          cursor
          node {
            id
            caption
            postPermissions {
              isOwner
            }
            user {
              id
              fullName
              firstName
              lastName
              username
              avatarUrl
              projectCount
              dynamicLink
              isOnline
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
            project {
              id
              title
              commentsDisabled
            }
            comments: commentsConnection(first: 2) {
              totalCount
              edges {
                node {
                  id
                  text
                  user {
                    id
                    fullName
                    firstName
                    lastName
                    username
                    avatarUrl
                    projectCount
                    dynamicLink
                    isOnline
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`
