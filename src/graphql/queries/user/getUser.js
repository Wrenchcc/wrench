import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { getUsername } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import userPostsConnectionFragment from 'graphql/fragments/user/postsConnection'

export const getUserByUsernameQuery = gql`
  query getUserByUsername($username: LowercaseString!, $after: String) {
    user(username: $username) {
      ...userInfo
      ...userPostsConnection
    }
  }
  ${userInfoFragment}
  ${userPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreUserPosts($username: LowercaseString!, $after: String) {
    user(username: $username) {
      ...userPostsConnection
    }
  }
  ${userPostsConnectionFragment}
`

// TODO: Change order on user: { user, navigation } when api is done
const getUserByUsernameOptions = {
  options: ({ navigation, after = null }) => ({
    variables: {
      username: getUsername(navigation),
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
    user: {
      ...user,
      ...pathOr(user, ['state', 'params', 'user'], navigation),
    },
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

export const getUserByUsername = graphql(getUserByUsernameQuery, getUserByUsernameOptions)
