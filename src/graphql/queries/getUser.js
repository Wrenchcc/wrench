import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { getUserId } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import userPostsConnectionFragment from 'graphql/fragments/user/postsConnection'

export const getUserQuery = gql`
  query getUser($id: ID!, $after: String) {
    user(id: $id) {
      ...userInfo
      ...userPostsConnection
    }
  }
  ${userInfoFragment}
  ${userPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreUserPosts($id: ID!, $after: String) {
    user(id: $id) {
      ...userPostsConnection
    }
  }
  ${userPostsConnectionFragment}
`

const getUserOptions = {
  options: ({ navigation, after = null }) => ({
    variables: {
      id: getUserId(navigation),
      after,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({
    data: { fetchMore, error, loading, user, networkStatus, refetch },
    ownProps: { navigation },
  }) => ({
    error,
    refetch,
    user: pathOr(null, ['state', 'params', 'user'], navigation), // Pass user data from navigation,
    posts: pathOr(null, ['posts', 'edges'], user),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], user),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () => fetchMore({
      query: LoadMorePosts,
      variables: {
        after: user.posts.edges[user.posts.edges.length - 1].cursor,
        id: user.id,
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

export const getUser = graphql(getUserQuery, getUserOptions)
