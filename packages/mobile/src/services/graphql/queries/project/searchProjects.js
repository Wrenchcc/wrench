import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'services/graphql/utils/mapListProps'
import projectInfoFragment from 'services/graphql/fragments/project/projectInfo'

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
            cover {
              uri
              default
            }
          }
        }
      }
    }
  }
  ${projectInfoFragment}
`

const searchProjectsOptions = {
  options: ({ query = '' }) => ({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      query,
      type: 'PROJECTS',
    },
  }),
  props: mapListProps('projects'),
}

export const searchProjects = graphql(SearchProjectsQuery, searchProjectsOptions)
