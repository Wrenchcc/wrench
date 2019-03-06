import gql from 'graphql-tag'
import projectInfoSmall from '../../fragments/project/projectInfoSmall'

export const GET_POPULAR_PROJECTS = gql`
  query getPopularProjects($after: String, $first: Int) {
    projects(type: POPULAR, after: $after, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfoSmall
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
  ${projectInfoSmall}
`
