import gql from 'graphql-tag'
import userInfoSmall from '../../fragments/user/userInfoSmall'

export const GET_FEED = gql`
  query getFeed($after: String) {
    feed {
      posts: postsConnection(after: $after) {
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
  }
  ${userInfoSmall}
`
