import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend } from 'ramda'
import postInfo from 'graphql/fragments/post/postInfo'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import optimisticId from 'graphql/utils/optimisticId'

const CommentMutation = gql`
  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
    addComment(postId: $postId, commentId: $commentId, input: $input) {
      commentId
      id
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
        __typename: 'Mutation',
        addComment: {
          __typename: 'Comment',
          id: optimisticId(),
          commentId,
          postId,
          text,
        },
      },
      update: (proxy, { data: { addComment } }) => {},
    }),
  }),
}

const addCommentToPostOptions = {
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
        __typename: 'Mutation',
        addComment: {
          __typename: 'Comment',
          id: optimisticId(),
          commentId,
          postId,
          text,
        },
      },
      update: (proxy, { data: { addComment } }) => {
        const { user } = proxy.readQuery({ query: CurrentUserQuery })

        const data = proxy.readFragment({
          id: `Post:${postId}`,
          fragment: postInfo,
          fragmentName: 'postInfo',
        })

        const edges = prepend(
          {
            node: {
              id: optimisticId(),
              ...addComment,
              user,
              __typename: 'Comment',
            },
            __typename: 'CommentEdge',
          },
          data.comments.edges
        )

        proxy.writeFragment({
          id: `Post:${postId}`,
          fragment: postInfo,
          fragmentName: 'postInfo',
          data: {
            ...data,
            comments: {
              ...data.comments,
              edges,
              totalCount: data.comments.totalCount + 1,
            },
          },
        })
      },
    }),
  }),
}

export const addCommentToPost = graphql(CommentMutation, addCommentToPostOptions)
export const addComment = graphql(CommentMutation, addCommentOptions)
