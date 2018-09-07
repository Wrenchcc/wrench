import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
// import { mapListProps } from 'graphql/utils/mapListProps'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

export const getProjectSuggestionsQuery = gql`
  query getProjectSuggestions($username: LowercaseString, $after: String) {
    projects: projectSuggestions(username: $username, after: $after) {
      category {
        id
        title
      }
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...projectInfo
          images: imagesConnection(first: 6, maxWidth: 335, maxHeight: 335) {
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
  ${projectInfoFragment}
`

const getProjectsSuggestionsOptions = {
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data }) => ({
    // isFetching: loading,
    projects: pathOr(null, ['projects'], data),
  }),
}

export const getProjectSuggestions = graphql(
  getProjectSuggestionsQuery,
  getProjectsSuggestionsOptions
)
