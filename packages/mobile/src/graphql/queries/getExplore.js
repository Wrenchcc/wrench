import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import { PROJECT_SORT_TYPES } from 'utils/enums'
import postsInfoFragment from 'graphql/fragments/post/postsInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

const PopularProjectsQuery = gql`
  query getPopularProjects($type: ProjectSortType!, $after: String) {
    projects(type: $type, after: $after) @connection(key: "projects", filter: ["type"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...projectInfo
          files: filesConnection(first: 1, type: IMAGE) {
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

export const RecentPostsQuery = gql`
  query getRecentPosts($after: String) {
    posts(after: $after) @connection(key: "posts") {
      ...postsInfo
    }
  }
  ${postsInfoFragment}
`

const getPopularProjectsOptions = {
  options: {
    variables: {
      type: PROJECT_SORT_TYPES.POPULAR,
    },
  },
  props: mapListProps('projects'),
}

const getRecentPostsOptions = {
  options: {},
  props: mapListProps('posts'),
}

export const getPopularProjects = graphql(PopularProjectsQuery, getPopularProjectsOptions)
export const getRecentPosts = graphql(RecentPostsQuery, getRecentPostsOptions)
