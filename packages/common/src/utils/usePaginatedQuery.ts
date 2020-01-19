// @ts-nocheck
import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'rambda'
import { isRefetching, isFetchingMore } from './networkStatus'

export default path => (query, options?) => {
  const { fetchMore, error, ...result } = useQuery(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
  })

  const data = pathOr({}, ['data', ...path], result)

  const handleFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          after: data.edges[data.edges.length - 1].cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!pathOr(null, path, fetchMoreResult)) {
            return previousResult
          }

          const { edges, pageInfo, ...rest } = pathOr({}, path, fetchMoreResult)

          return {
            ...previousResult,
            data: [
              ...pathOr({}, [...path, 'edges'], previousResult),
              pathOr({}, [...path, 'edges'], fetchMoreResult),
            ],
          }

          //   return {
          //     [path]: {
          //       ...rest,
          //       __typename: previousResult[path].__typename,
          //       edges: [...previousResult[path].edges, ...edges],
          //       pageInfo,
          //     },
          //   }
        },
      }),
    [result]
  )

  return {
    ...result.data,
    refetch: result.refetch,
    error: result.error,
    data: pathOr(null, ['edges'], data),
    fetchMore: handleFetchMore,
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
    isFetching: result.loading || isFetchingMore(result.networkStatus),
    isRefetching: isRefetching(result.networkStatus),
  }
}
