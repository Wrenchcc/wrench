import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { pathOr } from 'ramda'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'

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
  props: ({ data: { fetchMore, loading, networkStatus, ...props } }) => {
    const data = props.models
    const isFetching = loading

    return {
      ...props,
      models: isFetching ? [] : pathOr(null, ['edges'], data),
      hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
      isRefetching: isRefetching(networkStatus),
      isFetching,
      isFetchingMore: isFetchingMore(networkStatus),
      fetchMore: () => fetchMore({
        variables: {
          after: data.edges[data.edges.length - 1].cursor,
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
