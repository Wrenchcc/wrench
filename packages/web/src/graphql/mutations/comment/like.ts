import gql from 'graphql-tag'

export const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($id: ID!) {
    likeComment(id: $id) {
      id
      likes {
        isLiked
        totalCount
      }
    }
  }
`
