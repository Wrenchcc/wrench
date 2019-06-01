import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend } from 'ramda'
import commentInfo from 'graphql/fragments/comment/commentInfo'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { CommentsQuery } from 'graphql/queries/comment/getComments'
import optimisticId from 'graphql/utils/optimisticId'
import { logError } from 'utils/sentry'

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
      update: (proxy, { data: { addComment } }) => {
        try {
          const { user } = proxy.readQuery({ query: CurrentUserQuery })

          // Is reply
          if (commentId) {
            // Get comment fragment
            const data = proxy.readFragment({
              id: `Comment:${commentId}`,
              fragment: commentInfo,
              fragmentName: 'commentInfo',
            })

            const edges = prepend(
              {
                cursor: optimisticId(),
                node: {
                  id: optimisticId(),
                  createdAt: new Date().toISOString(),
                  ...addComment,
                  user,
                  __typename: 'Comment',
                },
                __typename: 'CommentEdge',
              },
              data.replies.edges
            )

            // Add to top of replies
            proxy.writeFragment({
              id: `Comment:${commentId}`,
              fragment: commentInfo,
              fragmentName: 'commentInfo',
              data: {
                ...data,
                replies: {
                  ...data.replies,
                  edges,
                  totalCount: data.replies.totalCount + 1,
                },
              },
            })
          } else {
            const data = proxy.readQuery({
              query: CommentsQuery,
              variables: {
                postId,
              },
            })

            const comments = {
              ...data,
              comments: {
                ...data.comments,
                edges: prepend(
                  {
                    cursor: optimisticId(),
                    node: {
                      id: optimisticId(),
                      createdAt: new Date().toISOString(),
                      replies: {
                        totalCount: 0,
                        pageInfo: {
                          hasNextPage: false,
                          __typename: 'RepliesConnection',
                        },
                        edges: [],
                        __typename: 'CommentConnection',
                      },
                      ...addComment,
                      user,
                      __typename: 'Comment',
                    },
                    __typename: 'CommentEdge',
                  },
                  data.comments.edges
                ),
              },
            }

            proxy.writeQuery({
              query: CommentsQuery,
              variables: {
                postId,
              },
              data: comments,
            })
          }
        } catch (err) {
          logError(err)
        }
      },
    }),
  }),
}

export const addComment = graphql(CommentMutation, addCommentOptions)
