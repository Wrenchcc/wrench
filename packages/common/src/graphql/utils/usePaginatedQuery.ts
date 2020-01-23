// @ts-nocheck
import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'rambda'
import { isRefetching, isFetchingMore } from './networkStatus'

/*
const {
  data: { edges, post, project },
  isFetching,
  fetchMore,
  isRefetching,
  hasNextPage,
  refetch,
} = usePaginatedQuery(['project', 'posts'], {
  project: initialProjectData,
  post: initialPostData,
})(ProjectDocument, {
  variables: {
    slug,
    id,
    postId,
  },
})
*/

export default (path, initialData) => (query, options?) => {
  const { fetchMore, error, data, error, refetch, loading, networkStatus } = useQuery(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const blaj = pathOr({}, path, data)

  const handleFetchMore = useCallback(
    () =>
      fetchMore({
        variables: {
          after: blaj.edges[blaj.edges.length - 1].cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!pathOr(false, path, fetchMoreResult)) {
            return previousResult
          }

          if (path.length > 1) {
            return {
              ...prev,
              [path[0]]: {
                ...pathOr({}, [path[0]], prev),
                [path[1]]: {
                  ...pathOr({}, path, prev),
                  pageInfo: {
                    ...pathOr({}, [...path, 'pageInfo'], prev),
                    ...pathOr({}, [...path, 'pageInfo'], fetchMoreResult),
                  },
                  edges: [
                    ...pathOr({}, [...path, 'edges'], prev),
                    ...pathOr({}, [...path, 'edges'], fetchMoreResult),
                  ],
                },
              },
            }
          }

          // Fix fetch more
          return {
            [path]: {
              ...pathOr({}, path, fetchMoreResult),
              __typename: prev[path].__typename,
              edges: [
                ...pathOr({}, [path, 'edges'], prev),
                ...pathOr({}, [path, 'edges'], fetchMoreResult),
              ],
              pageInfo: pathOr({}, [path, 'pageInfo'], fetchMoreResult),
            },
          }
        },
      }),
    [data]
  )

  return {
    error,
    refetch,
    data: {
      ...initialData,
      ...data,
      edges: pathOr(null, ['edges'], blaj),
    },
    fetchMore: handleFetchMore,
    hasNextPage: pathOr(false, ['pageInfo', 'hasNextPage'], blaj),
    isFetching: loading || isFetchingMore(networkStatus),
    isRefetching: isRefetching(networkStatus),
  }
}
