import gql from 'graphql-tag'
import { pathOr, update } from 'ramda'
import { graphql } from 'react-apollo'
import { getPostId } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import commentInfoFragment from 'graphql/fragments/comment/commentInfo'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export const CommentsQuery = gql`
  query getComments($postId: ID!, $after: String) {
    post(id: $postId) {
      id
      caption
      createdAt
      user {
        ...userInfo
      }
    }
    comments(postId: $postId, after: $after) @connection(key: "comments") {
      ...commentInfo
    }
  }
  ${commentInfoFragment}
  ${userInfoFragment}
`

const LoadMoreComments = gql`
  query loadMoreComments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) @connection(key: "comments") {
      ...commentInfo
    }
  }
  ${commentInfoFragment}
`

const LoadMoreReplies = gql`
  query loadMoreReplies($id: ID!, $after: String, $first: Int) {
    comment(id: $id) {
      replies: repliesConnection(after: $after, first: $first) {
        pageInfo {
          hasNextPage
        }
        totalCount
        edges {
          node {
            id
            commentId
            text
            createdAt
            user {
              ...userInfo
            }
          }
        }
      }
    }
  }
  ${userInfoFragment}
`

const getCommentsOptions = {
  options: ({ navigation }) => ({
    variables: {
      postId: getPostId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data: { fetchMore, error, loading, comments, post, networkStatus, refetch } }) => ({
    error,
    refetch,
    post,
    comments: pathOr(null, ['edges'], comments),
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], comments),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () => fetchMore({
      query: LoadMoreComments,
      variables: {
        after: comments.edges[comments.edges.length - 1].cursor,
        postId: post.id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.comments) {
          return prev
        }

        return {
          ...prev,
          comments: {
            ...prev.comments,
            pageInfo: {
              ...prev.comments.pageInfo,
              ...fetchMoreResult.comments.pageInfo,
            },
            edges: [...prev.comments.edges, ...fetchMoreResult.comments.edges],
          },
        }
      },
    }),
    fetchMoreReplies: (id, after) => fetchMore({
      query: LoadMoreReplies,
      variables: {
        // after,
        postId: post.id,
        id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.comment.replies) {
          return prev
        }

        const index = prev.comments.edges.findIndex(({ node }) => node.id === id)

        return {
          ...prev,
          comments: {
            ...prev.comments,
            edges: update(
              index,
              {
                ...prev.comments.edges[index],
                node: {
                  ...prev.comments.edges[index].node,
                  replies: {
                    ...prev.comments.edges[index].node.replies,
                    ...fetchMoreResult.comment.replies,
                    edges: [
                      ...prev.comments.edges[index].node.replies.edges,
                      ...fetchMoreResult.comment.replies.edges,
                    ],
                  },
                },
              },
              prev.comments.edges
            ),
          },
        }
      },
    }),
  }),
}

export const getComments = graphql(CommentsQuery, getCommentsOptions)
