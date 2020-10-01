// @ts-nocheck
import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { pathOr } from 'rambda'
import { isRefetching, isFetchingMore } from './networkStatus'

export default (path, initialData?) => (query, options?) => {
  const [loadData, { fetchMore, data, error, refetch, loading, networkStatus }] = useLazyQuery(
    query,
    {
      ...options,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    }
  )

  const result = pathOr({}, path, data)

  const handleFetchMore = useCallback(
    (variables = {}) =>
      fetchMore({
        variables: {
          after: result.edges[result.edges.length - 1].cursor,
        },
        ...variables,
      }),
    [result]
  )

  return {
    loadData,
    error,
    refetch,
    data: {
      ...initialData,
      ...data,
      ...result,
      edges: pathOr(null, ['edges'], result),
    },
    fetchMore: handleFetchMore,
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], result),
    isFetching: loading || isFetchingMore(networkStatus),
    isRefetching: isRefetching(networkStatus),
  }
}
