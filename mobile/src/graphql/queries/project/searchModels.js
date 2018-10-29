import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectCoverFragment from 'graphql/fragments/project/projectCover'

export const searchModelsQuery = gql`
  query searchProjects($query: String!) {
    projects: search(query: $query) {
      pageInfo {
        hasNextPage
      }
      edges {
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

const searchModelsOptions = {
  options: ({ query = '' }) => console.log(query) || {
    variables: {
      query,
      type: 'PROJECTS',
    },
    fetchPolicy: 'cache-and-network',
  },
  props: mapListProps('models'),
}

export const searchModels = graphql(searchModelsQuery, searchModelsOptions)
