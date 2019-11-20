import gql from 'graphql-tag'
import commentInfo from 'graphql/fragments/comment/commentInfo'
import userInfo from 'graphql/fragments/user/userInfoSmall'

export const GET_MORE_REPLIES = gql`
  query loadMoreReplies($id: ID!, $after: String) {
    comment(id: $id) {
      replies: repliesConnection(after: $after, first: 5) {
        pageInfo {
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            id
            commentId
            text
            createdAt
            permissions {
              isOwner
            }
            likes {
              isLiked
              totalCount
            }
            user {
              ...userInfoSmall
            }
          }
        }
      }
    }
  }
  ${userInfo}
`

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
