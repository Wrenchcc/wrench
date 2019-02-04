import gql from 'graphql-tag'
import { pathOr, update } from 'ramda'
import { graphql } from 'react-apollo'
import { getPostId } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import commentInfoFragment from 'graphql/fragments/comment/commentInfo'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export const CommentsQuery = gql`
  query getComments($postId: ID!, $after: String, $firstReplies: Int) {
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
  query loadMoreComments($postId: ID!, $after: String, $firstReplies: Int) {
    comments(postId: $postId, after: $after) @connection(key: "comments") {
      ...commentInfo
    }
  }
  ${commentInfoFragment}
`

const LoadMoreReplies = gql`
  query loadMoreReplies($commentId: ID!, $first: Int) {
    replies(commentId: $commentId, first: $first) {
      pageInfo {
        hasNextPage
      }
      totalCount
      edges {
        node {
          id
          text
          createdAt
          user {
            ...userInfo
          }
        }
      }
    }
  }
  ${userInfoFragment}
`

const getCommentsOptions = {
  options: ({ navigation, after }) => ({
    variables: {
      after,
      firstReplies: 1,
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
    fetchMoreReplies: commentId => fetchMore({
      query: LoadMoreReplies,
      variables: {
        // after: replies.edges[replies.edges.length - 1].cursor,
        commentId,
        first: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.replies) {
          return prev
        }

        const index = fetchMoreResult.replies.edges.findIndex(({ node }) => node.id === commentId)

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
                    edges: [
                      ...prev.comments.edges[index].node.replies.edges,
                      ...fetchMoreResult.replies.edges,
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
    fetchMore: () => fetchMore({
      query: LoadMoreComments,
      variables: {
        after: comments.edges[comments.edges.length - 1].cursor,
        postId: post.id,
        firstReplies: 1,
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
  }),
}

export const getComments = graphql(CommentsQuery, getCommentsOptions)
