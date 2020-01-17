import React, { memo, useEffect } from 'react'
import { usePaginatedLazyQuery, SearchUsersDocument } from '@wrench/common'
import { User, InfiniteList, NoResults, SearchingFor, Loader } from 'ui'

const ITEM_HEIGHT = 71

const getItemLayout = (_, index) => ({
  index,
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
})

const renderItem = ({ item }) => <User data={item.node} />

function Users({ query }) {
  const {
    loadData,
    data,
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery('users')(SearchUsersDocument)

  useEffect(() => {
    if (query.length > 0 || (data && query.length === 0)) {
      loadData({
        variables: {
          query,
        },
      })
    }
  }, [query])

  return (
    <InfiniteList
      borderSeparator
      paddingBottom={40}
      getItemLayout={getItemLayout}
      ListEmptyComponent={!isFetching && query.lenght && <NoResults />}
      data={data}
      fetchMore={fetchMore}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={refetch}
      renderItem={renderItem}
      defaultPadding
      ListFooterComponent={
        isFetching && !data ? <SearchingFor query={query} /> : hasNextPage && <Loader />
      }
    />
  )
}

export default memo(Users)
