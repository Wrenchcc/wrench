import React, { memo } from 'react'
import { User, InfiniteList, NoResults, SearchingFor, Loader } from 'ui'

const ITEM_HEIGHT = 70

const getItemLayout = (_, index) => ({
  index,
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
})

const renderItem = ({ item }) => <User data={item.node} />

function Users({ query }) {
  const isFetching = false
  const data = null
  const hasNextPage = false
  const isRefetching = false
  const refetch = () => {}

  return (
    <InfiniteList
      borderSeparator
      paddingBottom={40}
      getItemLayout={getItemLayout}
      ListEmptyComponent={!isFetching && <NoResults />}
      data={data}
      fetchMore={null}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={refetch}
      renderItem={renderItem}
      defaultPadding
      ListFooterComponent={
        (query.length === 1 && !data) || (isFetching && query.length !== 0) ? (
          <SearchingFor query={query} />
        ) : (
          hasNextPage && <Loader />
        )
      }
    />
  )
}

export default memo(Users)
