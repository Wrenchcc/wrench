import gql from 'graphql-tag'
import commentInfo from 'graphql/fragments/comment/commentInfo'

export const GET_COMMENTS = gql`
  query getComments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) @connection(key: "comments", filter: ["postId"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...commentInfo
        }
      }
    }
  }
  ${commentInfo}
`
