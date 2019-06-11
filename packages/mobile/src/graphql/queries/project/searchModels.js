import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { isFetchingMore } from 'graphql/utils/networkStatus'

export const SearchModelsQuery = gql`
  query searchModels($query: String!, $after: String, $type: SearchType!) {
    models: search(query: $query, after: $after, type: $type, first: 20)
      @connection(key: "models", filter: ["query", "type"]) {
      pageInfo {
        hasNextPage
      }
      edges {
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
    fetchPolicy: 'cache-and-network',
    variables: {
      query,
      type: 'MODELS',
    },
  }),
  props: ({ data: { fetchMore, loading, networkStatus, ...props } }) => {
    const data = props.models

    return {
      ...props,
      models: loading && !isFetchingMore(networkStatus) ? [] : pathOr(null, ['edges'], data),
      hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
      isFetching: loading || isFetchingMore(networkStatus),
      fetchMore: () =>
        fetchMore({
          variables: {
            after: data.edges.length.toString(),
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (previousResult && !previousResult.models) {
              return previousResult
            }

            const { edges, pageInfo, ...rest } = fetchMoreResult.models

            return {
              models: {
                ...rest,
                __typename: previousResult.models.__typename, // eslint-disable-line
                edges: [...previousResult.models.edges, ...edges],
                pageInfo,
              },
            }
          },
        }),
    }
  },
}

export const searchModels = graphql(SearchModelsQuery, searchModelsOptions)
