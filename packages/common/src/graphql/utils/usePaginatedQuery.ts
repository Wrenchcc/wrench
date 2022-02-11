// @ts-nocheck
import { useCallback } from 'react'
import { NetworkStatus } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'rambda'

export default (path, initialData?: any) => (query, options?: any) => {
  const { fetchMore, error, data, refetch, loading, networkStatus, previousData } = useQuery(
    query,
    {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      ...options,
    }
  )

  const result = pathOr({}, path, data)
  const previousResult = pathOr({}, path, previousData)

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
    error,
    refetch,
    data: {
      ...initialData,
      ...data,
      ...result,
      edges: pathOr(null, ['edges'], result),
    },
    previousData: {
      ...previousResult,
      edges: pathOr(null, ['edges'], previousResult),
    },
    fetchMore: handleFetchMore,
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], result),
    isFetching: loading,
    isRefetching: networkStatus === NetworkStatus.refetch,
  }
}
