import gql from 'graphql-tag'

export const ADD_COMMENT_MUTATION = gql`
  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
    addComment(postId: $postId, commentId: $commentId, input: $input) {
      commentId
      id
      text
    }
  }
`
