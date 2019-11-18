import gql from 'graphql-tag'
import projectInfoSmall from '../../fragments/project/projectInfoSmall'

export const GET_PROJECT_SUGGESTIONS = gql`
  query getProjectSuggestions($after: String) {
    projects: projectSuggestions(after: $after, first: 15) @connection(key: "projects") {
      type {
        id
        title
      }
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfoSmall
          cover {
            uri
            default
          }
        }
      }
    }
  }
  ${projectInfoSmall}
`
