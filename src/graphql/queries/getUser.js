import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { getUserId } from 'navigation/utils/selectors'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'

export const getUserQuery = gql`
  query getUser($id: ID!, $first: Int, $after: String) {
    user(id: $id) {
      id
      firstName
      lastName
      avatarUrl
      projectCount
      posts: postsConnection(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            caption
            user {
              id
              fullName
              username
              avatarUrl
            }
            images {
              uri
            }
            project {
              id
              title
            }
            comments: commentConnection(first: 2) {
              totalCount
              edges {
                node {
                  id
                  text
                  user {
                    fullName
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`

const LoadMorePosts = gql`
  query loadMoreUserPosts($after: String, $id: ID!) {
    user(id: $id) {
      posts: postsConnection(after: $after) {
        edges {
          cursor
          node {
            id
            caption
            user {
              id
              fullName
              username
              avatarUrl
            }
            images {
              uri
            }
            project {
              id
              title
            }
            comments: commentConnection(first: 2) {
              totalCount
              edges {
                node {
                  id
                  text
                  user {
                    fullName
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
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
