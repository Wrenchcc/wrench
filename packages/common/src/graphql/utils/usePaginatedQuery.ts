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

export default (path, initialData?) => (query, options?) => {
  const { fetchMore, error, data, error, refetch, loading, networkStatus } = useQuery(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const result = pathOr({}, path, data)

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        after: result.edges[result.edges.length - 1].cursor,
      },
    })
  }

  return {
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
