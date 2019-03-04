import gql from 'graphql-tag'
import userInfoSmall from '../../fragments/user/userInfoSmall'
import projectInfoSmall from '../../fragments/project/projectInfoSmall'

export const GET_EXPLORE = gql`
  query getExplore($after: String) {
    projects(type: POPULAR, after: $after, first: 8) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfoSmall
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

    posts(after: $after) {
      edges {
        cursor
        node {
          id
          caption
          user {
            ...userInfoSmall
          }
          project {
            id
            title
            slug
            commentsDisabled
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
          comments: commentsConnection(first: 2) {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                id
                text
                user {
                  ...userInfoSmall
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
  ${userInfoSmall}
  ${projectInfoSmall}
`
