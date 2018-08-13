import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import postsInfoFragment from 'graphql/fragments/post/postsInfo'
import userInfoFragment from 'graphql/fragments/user/userInfo'

// TODO: Fragments and on refresh get popular projects too
const getPopularProjectsQuery = gql`
  query getExplore($after: String) {
    projects(after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          title
          coverImage {
            uri
          }
          followers: followersConnection {
            totalCount
          }
          projectPermissions {
            isFollower
            isOwner
          }
          user {
            ...userInfo
          }
        }
      }
    }
  }
  ${userInfoFragment}
`

const getRecentPostsQuery = gql`
  query getRecentPosts($after: String) {
    posts(after: $after) {
      ...postsInfo
    }
  }
  ${postsInfoFragment}
`

const getPopularProjectsOptions = {
  options: ({ after = null }) => ({
    variables: {
      after,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('projects'),
}

const getRecentPostsOptions = {
  options: ({ after = null }) => ({
    variables: {
      after,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('posts'),
}

export const getPopularProjects = graphql(getPopularProjectsQuery, getPopularProjectsOptions)
export const getRecentPosts = graphql(getRecentPostsQuery, getRecentPostsOptions)
