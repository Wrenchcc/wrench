import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import currentUserInfoFragment from 'graphql/fragments/user/currentUserInfo'
import userPostsConnectionFragment from 'graphql/fragments/user/postsConnection'
import projectsConnectionFragment from 'graphql/fragments/user/projectsConnection'

export const CurrentUserQuery = gql`
  query getCurrentUser {
    user: currentUser {
      ...currentUserInfo
      ...userProjectsConnection
    }
  }
  ${currentUserInfoFragment}
  ${projectsConnectionFragment}
`

export const CurrentUserProfileQuery = gql`
  query getCurrentUserProfile($after: String) {
    user: currentUser {
      ...currentUserInfo
      ...userPostsConnection
      projects: projectsConnection {
        edges {
          node {
            id
            cover {
              uri
              default
            }
            title
            followers: followersConnection {
              totalCount
            }
            permissions {
              isOwner
              isFollower
            }
          }
        }
      }
    }
  }
  ${currentUserInfoFragment}
  ${userPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreProjectPosts($after: String) {
    user: currentUser {
      ...userPostsConnection
    }
  }
  ${userPostsConnectionFragment}
`

const getCurrentUserProfileOptions = {
  options: ({ after }) => ({
    variables: {
      after,
    },
  }),
  props: ({ data: { fetchMore, error, loading, user, networkStatus, refetch } }) => ({
    error,
    refetch,
    user,
    posts: pathOr(null, ['posts', 'edges'], user),
    hasNextPage: pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], user),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () =>
      fetchMore({
        query: LoadMorePosts,
        variables: {
          after: user.posts.edges[user.posts.edges.length - 1].cursor,
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

export const getCurrentUserProfile = graphql(CurrentUserProfileQuery, getCurrentUserProfileOptions)
