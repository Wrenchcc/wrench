import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend, update } from 'ramda'
import { getPostId } from 'navigation/utils/selectors'
import { FeedQuery } from 'graphql/queries/getFeed'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { CommentsQuery } from 'graphql/queries/comment/getComments'

const CommentMutation = gql`
  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
    addComment(postId: $postId, commentId: $commentId, input: $input) {
      commentId
      id
      text
    }
  }
`

const addCommentToFeedOptions = {
  props: ({ mutate }) => ({
    addComment: (postId, text) => mutate({
      variables: {
        postId,
        input: {
          text,
        },
      },
      update: (cache, { data: { addComment } }) => {
        const data = cache.readQuery({ query: FeedQuery })
        const index = data.feed.posts.edges.findIndex(post => post.node.id === postId)
        const { user } = cache.readQuery({ query: CurrentUserQuery })

        const comments = {
          ...data,
          feed: {
            ...data.feed,
            posts: {
              ...data.feed.posts,
              edges: update(
                index,
                {
                  ...data.feed.posts.edges[index],
                  node: {
                    ...data.feed.posts.edges[index].node,
                    comments: {
                      ...data.feed.posts.edges[index].node.comments,
                      edges: prepend(
                        {
                          node: {
                            id: Math.round(Math.random() * -1000000).toString(),
                            ...addComment,
                            user,
                            __typename: 'Comment',
                          },
                          __typename: 'CommentEdge',
                        },
                        data.feed.posts.edges[index].node.comments.edges
                      ),
                      totalCount: data.feed.posts.edges[index].node.comments.totalCount + 1,
                    },
                  },
                },
                data.feed.posts.edges
              ),
            },
          },
        }

        cache.writeQuery({ query: FeedQuery, data: comments })
      },
    }),
  }),
}

const addCommentOptions = {
  props: ({ mutate, ownProps: { navigation } }) => {
    const postId = getPostId(navigation)

    return {
      addComment: (text, commentId = null) => mutate({
        variables: {
          commentId,
          postId,
          input: {
            text,
          },
        },
        update: (cache, { data: { addComment } }) => {
          const data = cache.readQuery({
            query: CommentsQuery,
            variables: {
              postId,
            },
          })

          const { user } = cache.readQuery({ query: CurrentUserQuery })

          let comments = {}

          // Is reply
          if (commentId) {
            const index = data.comments.edges.findIndex(({ node }) => node.id === commentId)
            comments = {
              ...data,
              comments: {
                ...data.comments,
                edges: update(index, {
                  ...data.comments.edges[index],
                  node: {
                    ...data.comments.edges[index].node,
                    createdAt: new Date().toISOString(),
                    replies: {
                      ...data.comments.edges[index].node.replies,
                      edges: prepend(
                        {
                          cursor: Math.round(Math.random() * -1000000).toString(),
                          node: {
                            id: Math.round(Math.random() * -1000000).toString(),
                            commentId: Math.round(Math.random() * -1000000).toString(),
                            createdAt: new Date().toISOString(),
                            user,
                            ...addComment,
                            __typename: 'Comment',
                          },
                          __typename: 'CommentEdge',
                        },
                        data.comments.edges[index].node.replies.edges,
                      ),
                      __typename: 'CommentConnection',
                    },
                    __typename: 'Comment',
                  },
                  __typename: 'CommentEdge',
                },
                data.comments.edges),
              },
            }
          } else {
            comments = {
              ...data,
              comments: {
                ...data.comments,
                edges: prepend(
                  {
                    cursor: Math.round(Math.random() * -1000000).toString(),
                    node: {
                      id: Math.round(Math.random() * -1000000).toString(),
                      createdAt: new Date().toISOString(),
                      replies: {
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
          }

          cache.writeQuery({ query: CommentsQuery, data: comments })
        },
      }),
    }
  },
}

export const addCommentToFeed = graphql(CommentMutation, addCommentToFeedOptions)
export const addComment = graphql(CommentMutation, addCommentOptions)
