import React, { useCallback, useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Border from 'ui/Border'
import Loader from 'ui/Loader'
import { CONTENT_INSET } from 'navigation/constants'
import { keyExtractor } from 'navigation'

const renderLoader = (loaderInset?) => <Loader inset={loaderInset} />

function InfiniteList({
  contentContainerStyle = {},
  paddingHorizontal = 20,
  defaultPaddingTop,
  borderSeparator,
  data,
  isFetching,
  hasNextPage,
  fetchMore,
  refetch,
  isRefetching,
  ListEmptyComponent,
  initialNumToRender = 10,
  loaderInset = CONTENT_INSET,
  paddingBottom = 0,
  ...props
}) {
  const [isRefetchingLocal, setRefresh] = useState(false)
  const initialFetch = !data && isFetching
  const paddingTop = contentContainerStyle.paddingTop || (defaultPaddingTop && 20) || 0

  useEffect(() => {
    setRefresh(!!isRefetching)
  }, [isRefetching])

  // NOTE: Without this hack the refresh jumps around
  const onRefresh = useCallback(() => {
    if (refetch) {
      setRefresh(true)
      refetch()
    }
  }, [refetch])

  const onEndReached = useCallback(() => {
    if (hasNextPage && isRefetching !== true && !isFetching) {
      fetchMore()
    }
  }, [hasNextPage, isRefetching, isFetching, fetchMore])

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      keyExtractor={keyExtractor}
      onRefresh={refetch && onRefresh}
      onEndReached={onEndReached}
      refreshing={isRefetchingLocal}
      initialNumToRender={initialNumToRender}
      ListFooterComponent={hasNextPage ? renderLoader(loaderInset) : null}
      ListEmptyComponent={initialFetch ? renderLoader(loaderInset) : ListEmptyComponent}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      onEndReachedThreshold={1}
      contentContainerStyle={{
        flex: initialFetch ? 1 : 0,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop,
        paddingBottom,
        ...contentContainerStyle,
      }}
      {...(borderSeparator && { ItemSeparatorComponent: Border })}
      {...props}
    />
  )
}

export default InfiniteList
