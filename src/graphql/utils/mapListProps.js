import { pathOr, omit, last } from 'ramda'
import { isRefetching, isFetchingMore } from './networkStatus'

// TODO: Fix update query
export const mapListPropsWithPagination = types => ({
  data: { fetchMore, loading, networkStatus, ...restProps },
}) => {
  const data = pathOr(null, types, restProps)
  const props = omit(types, restProps) // remove type data
  const typeKey = last(types)

  return {
    [typeKey]: {
      ...props,
      data: pathOr(null, ['edges'], data),
      hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
      fetchMore: () =>
        fetchMore({
          variables: { after: data.edges[data.edges.length - 1].cursor },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { edges, pageInfo, ...rest } = pathOr(null, types, fetchMoreResult)

            const prev = pathOr(null, types, previousResult)
            if (!prev) {
              return prev
            }

            return {
              [typeKey]: {
                ...rest,
                __typename: prev.__typename, // eslint-disable-line
                edges: [...prev.edges, ...edges],
                pageInfo,
              },
            }
          },
        }),
    },
  }
}

export const mapListProps = type => ({
  data: { fetchMore, loading, networkStatus, ...restProps },
}) => {
  const data = restProps[type]
  const props = omit([type], restProps) // remove type data

  return {
    [type]: {
      ...props,
      data: pathOr(data, ['edges'], data),
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
    },
  }
}
