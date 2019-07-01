import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'

const usePaginatedQuery = key => (query, options) => {
  const result = useQuery(query, options)

  const handleFetchMore = useCallback(
    variables => {
      const { loading, fetchMore } = result

      if (loading) {
        return null
      }

      return fetchMore({
        variables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult[key]) {
            return previousResult
          }

          return {
            ...previousResult,
            [key]: {
              ...previousResult[key],
              ...fetchMoreResult[key],
              rows: [...previousResult[key].rows, ...fetchMoreResult[key].rows],
            },
          }
        },
      })
    },
    [result]
  )

  return {
    ...result,
    fetchMore: handleFetchMore,
  }
}

export default usePaginatedQuery
