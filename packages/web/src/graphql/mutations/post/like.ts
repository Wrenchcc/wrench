import gql from 'graphql-tag'

export const LIKE_POST_MUTATION = gql`
  mutation likePost($id: ID!) {
    likePost(id: $id) {
      id
      likes {
        isLiked
        totalCount
      }
    }
  }
`
