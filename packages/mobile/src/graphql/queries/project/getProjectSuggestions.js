import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

export const ProjectSuggestionsQuery = gql`
  query getProjectSuggestions($after: String) {
    projects: projectSuggestions(after: $after, first: 20) @connection(key: "projects") {
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
          coverUrl
        }
      }
    }
  }
  ${projectInfoFragment}
`

const getProjectsSuggestionsOptions = {
  props: ({ data }) => ({
    isFetching: pathOr(false, ['loading'], data),
    projects: pathOr([], ['projects'], data),
  }),
}

export const getProjectSuggestions = graphql(ProjectSuggestionsQuery, getProjectsSuggestionsOptions)
