import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

export const getProjectSuggestionsQuery = gql`
  query getProjectSuggestions($after: String) {
    projects: projectSuggestions(after: $after) {
      type {
        id
        title
      }
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfo
          ...projectCover
        }
      }
    }
  }
  ${projectInfoFragment}
`

const getProjectsSuggestionsOptions = {
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data }) => ({
    isFetching: pathOr(false, ['loading'], data),
    projects: pathOr([], ['projects'], data),
  }),
}

export const getProjectSuggestions = graphql(
  getProjectSuggestionsQuery,
  getProjectsSuggestionsOptions
)
