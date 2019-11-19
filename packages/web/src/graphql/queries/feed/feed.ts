import gql from 'graphql-tag'
import postInfo from '../../fragments/post/postInfo'

export const GET_FEED = gql`
  query getFeed($after: String) {
    feed {
      posts: postsConnection(after: $after) {
        edges {
          cursor
          node {
            ...postInfo
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${postInfo}
`
