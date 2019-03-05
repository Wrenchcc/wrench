import gql from 'graphql-tag'

export const SEARCH_PROJECT = gql`
  query searchProject($query: String!, $after: String) {
    projects: search(query: $query, after: $after, type: PROJECTS) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Project {
            id
          }
        }
      }
    }
  }
`
