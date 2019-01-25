import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import projectCoverFragment from 'graphql/fragments/project/projectCover'

export const ProjectSuggestionsQuery = gql`
  query getProjectSuggestions($after: String) {
    projects: projectSuggestions(after: $after, first: 20) {
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
  ${projectCoverFragment}
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

export const getProjectSuggestions = graphql(ProjectSuggestionsQuery, getProjectsSuggestionsOptions)
