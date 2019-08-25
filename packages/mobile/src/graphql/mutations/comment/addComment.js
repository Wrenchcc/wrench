import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { append, prepend } from 'ramda'
import postInfo from 'graphql/fragments/post/postInfo'
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
    addComment: (postId, text, commentId = null) =>
      mutate({
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
            likes: {
              isLiked: false,
              totalCount: 0,
              __typename: 'Likes',
            },
            permissions: {
              isOwner: true,
              __typename: 'CommentPermissions',
            },
          },
        },
        update: (cache, { data: { addComment } }) => {
          const { user } = cache.readQuery({ query: CurrentUserQuery })

          // Post
          try {
            const data = cache.readFragment({
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

            cache.writeFragment({
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
          } catch (err) {
            logError(err)
          }

          // Comment list
          try {
            // Is reply
            if (commentId) {
              // Get comment fragment
              const data = cache.readFragment({
                id: `Comment:${commentId}`,
                fragment: commentInfo,
                fragmentName: 'commentInfo',
              })

              const edges = append(
                {
                  cursor: optimisticId(),
                  node: {
                    id: optimisticId(),
                    createdAt: new Date().toISOString(),
                    likes: {
                      isLiked: false,
                      totalCount: 0,
                      __typename: 'Likes',
                    },
                    permissions: {
                      isOwner: true,
                      __typename: 'CommentPermissions',
                    },
                    ...addComment,
                    user,
                    __typename: 'Comment',
                  },
                  __typename: 'CommentEdge',
                },
                data.replies.edges
              )

              // Add to top of replies
              cache.writeFragment({
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
              const data = cache.readQuery({
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
                        likes: {
                          isLiked: false,
                          totalCount: 0,
                          __typename: 'Likes',
                        },
                        permissions: {
                          isOwner: true,
                          __typename: 'CommentPermissions',
                        },
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

              cache.writeQuery({
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
