import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { isRefetching, isFetchingMore } from 'graphql-old/utils/networkStatus'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'
import userPostsConnectionFragment from 'graphql-old/fragments/user/postsConnection'

export const UserByUsernameQuery = gql`
  query getUserByUsername($username: LowercaseString, $id: ID, $after: String) {
    user(id: $id, username: $username) {
      ...userInfo
      ...userPostsConnection
    }
  }
  ${userInfoFragment}
  ${userPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreUserPosts($id: ID, $username: LowercaseString, $after: String) {
    user(id: $id, username: $username) {
      ...userPostsConnection
    }
  }
  ${userPostsConnectionFragment}
`

const getUserByUsernameOptions = {
  options: ({ id, username }) => ({
    variables: {
      id,
      username,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data: { fetchMore, error, loading, user, networkStatus, refetch } }) => ({
    error,
    refetch,
    user,
    posts: pathOr(null, ['posts', 'edges'], user),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], user),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () => fetchMore({
      query: LoadMorePosts,
      variables: {
        after: user.posts.edges[user.posts.edges.length - 1].cursor,
        username: user.username,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.user) {
          return prev
        }

        return {
          ...prev,
          user: {
            ...prev.user,
            posts: {
              ...prev.user.posts,
              pageInfo: {
                ...prev.user.posts.pageInfo,
                ...fetchMoreResult.user.posts.pageInfo,
              },
              edges: [...prev.user.posts.edges, ...fetchMoreResult.user.posts.edges],
            },
          },
        }
      },
    }),
  }),
}

export const getUserByUsername = graphql(UserByUsernameQuery, getUserByUsernameOptions)
