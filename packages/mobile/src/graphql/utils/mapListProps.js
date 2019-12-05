import { pathOr } from 'rambda'
import { isRefetching, isFetchingMore } from './networkStatus'

export const mapListProps = type => ({ data: { fetchMore, loading, networkStatus, ...props } }) => {
  const data = props[type]

  return {
    ...props,
    ...data,
    [type]: pathOr(null, ['edges'], data),
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
    isRefetching: isRefetching(networkStatus),
    isFetching: loading || isFetchingMore(networkStatus),
    fetchMore: () =>
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
      }),
  }
}
