import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'ramda'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'

const usePaginatedQuery = type => (query, options) => {
  const { fetchMore, ...result } = useQuery(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
  })

  const data = pathOr({}, ['data', type], result)

  const handleFetchMore = useCallback(
    variables =>
      fetchMore({
        variables: {
          after: data.edges[data.edges.length - 1].cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!previousResult || !previousResult[type]) {
            return previousResult
          }

          const { edges, pageInfo, ...rest } = fetchMoreResult[type]

          return {
            [type]: {
              ...rest,
              __typename: previousResult[type].__typename,
              edges: [...previousResult[type].edges, ...edges],
              pageInfo,
            },
          }
        },
      })[result]
  )

  return {
    ...result,
    [type]: pathOr(null, ['edges'], data),
    fetchMore: handleFetchMore,
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
    isFetching: result.loading || isFetchingMore(result.networkStatus),
    isRefetching: isRefetching(result.networkStatus),
  }
}

export default usePaginatedQuery
