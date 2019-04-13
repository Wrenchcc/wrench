import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectCoverFragment from 'graphql/fragments/project/projectCover'

export const SearchProjectsQuery = gql`
  query searchProjects($query: String!, $after: String, $type: SearchType!) {
    projects: search(query: $query, after: $after, type: $type)
      @connection(key: "projects", filter: ["query", "type"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Project {
            ...projectInfo
            ...projectCover
          }
        }
      }
    }
  }
  ${projectInfoFragment}
  ${projectCoverFragment}
`

const searchProjectsOptions = {
  options: ({ query = '' }) => ({
    variables: {
      query,
      type: 'PROJECTS',
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('projects'),
}

export const searchProjects = graphql(SearchProjectsQuery, searchProjectsOptions)
