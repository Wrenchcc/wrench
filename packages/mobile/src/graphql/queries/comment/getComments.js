import gql from 'graphql-tag'
import { pathOr, update } from 'ramda'
import { graphql } from 'react-apollo'
import { getPostId, getPostIdFromDeeplink } from 'navigation/utils/selectors'
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
    comments(postId: $postId, after: $after) @connection(key: "comments", filter: ["postId"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...commentInfo
        }
      }
    }
  }
  ${commentInfoFragment}
  ${userInfoFragment}
`

const LoadMoreComments = gql`
  query loadMoreComments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) @connection(key: "comments", filter: ["postId"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...commentInfo
        }
      }
    }
  }
  ${commentInfoFragment}
`

const LoadMoreReplies = gql`
  query loadMoreReplies($id: ID!, $after: String) {
    comment(id: $id) {
      replies: repliesConnection(after: $after, first: 5) {
        pageInfo {
          hasNextPage
        }
        totalCount
        edges {
          cursor
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
      postId: getPostId(navigation) || getPostIdFromDeeplink(navigation),
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
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { edges, pageInfo, ...rest } = fetchMoreResult.comments

        if (!fetchMoreResult.comments) {
          return previousResult
        }

        return {
          ...previousResult,
          comments: {
            ...rest,
            edges: [...previousResult.comments.edges, ...edges],
            pageInfo,
          },
        }
      },
    }),
    fetchMoreReplies: (id, after) => fetchMore({
      query: LoadMoreReplies,
      variables: {
        after,
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
