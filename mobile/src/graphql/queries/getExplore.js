import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import { PROJECT_SORT_TYPES } from 'utils/enums'
import postsInfoFragment from 'graphql/fragments/post/postsInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

// TODO: Fragments and on refresh get popular projects too
const PopularProjectsQuery = gql`
  query getPopularProjects($type: ProjectSortType!, $after: String) {
    projects(type: $type, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfo
          files: filesConnection(first: 1, maxWidth: 180, maxHeight: 180, type: IMAGE) {
            edges {
              node {
                id
                uri
              }
            }
          }
        }
      }
    }
  }
  ${projectInfoFragment}
`

const RecentPostsQuery = gql`
  query getRecentPosts($after: String) {
    posts(after: $after) {
      ...postsInfo
    }
  }
  ${postsInfoFragment}
`

const getPopularProjectsOptions = {
  options: ({ after }) => ({
    variables: {
      after,
      type: PROJECT_SORT_TYPES.POPULAR,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('projects'),
}

const getRecentPostsOptions = {
  options: ({ after }) => ({
    variables: {
      after,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('posts'),
}

export const getPopularProjects = graphql(PopularProjectsQuery, getPopularProjectsOptions)
export const getRecentPosts = graphql(RecentPostsQuery, getRecentPostsOptions)
