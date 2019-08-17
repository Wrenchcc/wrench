import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'ramda'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'

const usePaginatedQuery = (type, path) => (query, options) => {
  const { fetchMore, ...result } = useQuery(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
  })

  const { data } = result

  const list = pathOr([], path, data)

  const handleFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          after: list.edges[list.edges.length - 1].cursor,
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
      }),
    [result]
  )

  return {
    ...result,
    ...data,
    [type]: pathOr(null, ['edges'], list),
    fetchMore: handleFetchMore,
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], list),
    isFetching: result.loading || isFetchingMore(result.networkStatus),
    isRefetching: isRefetching(result.networkStatus),
  }
}

export default usePaginatedQuery
