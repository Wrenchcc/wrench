import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { mapListProps } from 'graphql/utils/mapListProps'

export const SearchModelsQuery = gql`
  query searchModels($query: String!, $type: SearchType!, $after: String) {
    models: search(query: $query, type: $type, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Model {
            id
            brand {
              name
            }
            model
            year
          }
        }
      }
    }
  }
`

const searchModelsOptions = {
  options: ({ query = '' }) => ({
    variables: {
      query,
      type: 'MODELS',
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('models'),
}

export const searchModels = graphql(SearchModelsQuery, searchModelsOptions)
