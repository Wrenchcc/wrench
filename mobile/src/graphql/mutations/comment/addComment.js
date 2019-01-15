import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { prepend, update } from 'ramda'
import { getPostId } from 'navigation/utils/selectors'
import { FeedQuery } from 'graphql/queries/getFeed'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
// import { CommentsQuery } from 'graphql/queries/comment/getComments'

const CommentMutation = gql`
  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
    addComment(postId: $postId, commentId: $commentId, input: $input) {
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
        const data = cache.readQuery({ query: FeedQuery, variables: { userId: null } })
        const index = data.posts.edges.findIndex(post => post.node.id === postId)
        const { user } = cache.readQuery({ query: CurrentUserQuery })

        const comments = {
          ...data,
          posts: {
            ...data.posts,
            edges: update(
              index,
              {
                ...data.posts.edges[index],
                node: {
                  ...data.posts.edges[index].node,
                  comments: {
                    ...data.posts.edges[index].node.comments,
                    edges: prepend(
                      {
                        node: {
                          id: Math.round(Math.random() * -1000000),
                          ...addComment,
                          user,
                          __typename: 'Comment',
                        },
                        __typename: 'CommentEdge',
                      },
                      data.posts.edges[index].node.comments.edges
                    ),
                    totalCount: data.posts.edges[index].node.comments.totalCount + 1,
                  },
                },
              },
              data.posts.edges
            ),
          },
        }

        cache.writeQuery({ query: FeedQuery, data: comments })
      },
    }),
  }),
}

const addCommentOptions = {
  props: ({ mutate, ownProps: { navigation } }) => ({
    addComment: (text, commentId = null) => mutate({
      variables: {
        commentId,
        postId: getPostId(navigation),
        input: {
          text,
        },
      },
      // update: (cache, { data: { addComment } }) => {
      //   const data = cache.readQuery({
      //     query: CommentsQuery,
      //     variables: {
      //       postId: getPostId(navigation),
      //     },
      //   })
      //
      //   const { user } = cache.readQuery({ query: CurrentUserQuery })
      //
      //   const comments = {
      //     ...data,
      //     comments: {
      //       ...data.comments,
      //       edges: prepend(
      //         {
      //           node: {
      //             id: Math.round(Math.random() * -1000000),
      //             createdAt: new Date().toISOString(),
      //             replies: {
      //               pageInfo: {
      //                 hasNextPage: false,
      //                 __typename: 'RepliesConnection',
      //               },
      //               edges: [],
      //               __typename: 'CommentConnection',
      //             },
      //             ...addComment,
      //             user,
      //             __typename: 'Comment',
      //           },
      //           __typename: 'CommentEdge',
      //         },
      //         data.comments.edges
      //       ),
      //     },
      //   }
      //
      //   cache.writeQuery({ query: CommentsQuery, data: comments })
      // },
    }),
  }),
}

export const addCommentToFeed = graphql(CommentMutation, addCommentToFeedOptions)
export const addComment = graphql(CommentMutation, addCommentOptions)
