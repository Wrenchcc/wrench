import { pathOr, omit } from 'ramda'
import { isRefetching, isFetchingMore } from './networkStatus'

export const mapListProps = type => ({
  data: { fetchMore, loading, networkStatus, ...restProps },
}) => {
  const data = restProps[type]
  const props = omit([type], restProps) // remove type data

  return {
    ...data,
    [type]: {
      ...props,
      data: pathOr(null, ['edges'], data),
      hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], data),
      isRefetching: isRefetching(networkStatus),
      isFetching: loading || isFetchingMore(networkStatus),
      fetchMore: () => fetchMore({
        variables: { after: data.edges[data.edges.length - 1].cursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const { edges, pageInfo, ...rest } = fetchMoreResult[type]

          if (!previousResult[type]) {
            return previousResult
          }

          return {
            [type]: {
              ...rest,
                __typename: previousResult[type].__typename, // eslint-disable-line
              edges: [...previousResult[type].edges, ...edges],
              pageInfo,
            },
          }
        },
      }),
    },
  }
}
