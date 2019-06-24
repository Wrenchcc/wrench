import React, { memo } from 'react'
import { searchUsers } from 'graphql/queries/user/searchUsers'
import { User, InfiniteList, NoResults, SearchingFor, Loader } from 'ui'

const ITEM_HEIGHT = 70

const getItemLayout = (data, index) => ({
  index,
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
})

const renderItem = ({ item }) => <User data={item.node} />

function Users({ fetchMore, hasNextPage, isFetching, isRefetching, refetch, users, query }) {
  return (
    <InfiniteList
      borderSeparator
      paddingBottom={40}
      getItemLayout={getItemLayout}
      ListEmptyComponent={!isFetching && <NoResults />}
      data={users}
      fetchMore={fetchMore}
      hasNextPage={isFetching ? false : hasNextPage}
      isFetching={isFetching && query.length === 0}
      isRefetching={isRefetching}
      refetch={refetch}
      renderItem={renderItem}
      defaultPadding
      ListFooterComponent={
        (query.length === 1 && !users) || (isFetching && query.length !== 0) ? (
          <SearchingFor query={query} />
        ) : (
          hasNextPage && <Loader />
        )
      }
    />
  )
}

export default memo(searchUsers(Users))
