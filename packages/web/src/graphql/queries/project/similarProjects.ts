import gql from 'graphql-tag'
import projectInfoSmall from 'graphql/fragments/project/projectInfoSmall'

export const SIMILAR_PROJECTS_QUERY = gql`
  query similarProjects($id: ID!, $first: Int) {
    similarProjects(id: $id, first: $first) {
      edges {
        node {
          cover {
            uri
          }
          ...projectInfoSmall
        }
      }
    }
  }
  ${projectInfoSmall}
`
