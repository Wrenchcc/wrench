import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const addCommentMutation = gql`
  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
    addComment(postId: $postId, commentId: $commentId, input: $input) {
      text
    }
  }
`

const addCommentOptions = {
  props: ({ mutate }) => ({
    addComment: (postId, text, commentId = null) => mutate({
      variables: {
        commentId,
        postId,
        input: {
          text,
        },
      },
      optimisticResponse: {
        __typename: 'Post',
        comments: {
          __typename: 'CommentConnection',
          totalCount: 2,
          // edges: [
          //   {
          //     createdAt: new Date(),
          //     updatedAt: new Date(),
          //     // id: -1,
          //     text,
          //     postId,
          //   },
          // ],
        },
      },
    }),
  }),
}

export const addComment = graphql(addCommentMutation, addCommentOptions)
