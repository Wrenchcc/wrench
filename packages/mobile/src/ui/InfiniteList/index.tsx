import React, { useCallback, useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import Border from 'ui/Border'
import Loader from 'ui/Loader'
import { CONTENT_INSET } from 'navigation/constants'
import { keyExtractor } from 'navigation'

const renderLoader = (loaderInset?) => <Loader inset={loaderInset} />

function InfiniteList({
  contentContainerStyle = {},
  paddingHorizontal = 20,
  paddingVertical = 20,
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
  ItemSeparatorComponentStyle = {},
  defaultSeparator = true,
  ...props
}) {
  const [isRefetchingLocal, setRefresh] = useState(false)
  const initialFetch = !data && isFetching

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

  const ItemSeparatorComponent = useCallback(() => {
    if (!defaultSeparator || props.horizontal) {
      return null
    }
    if (borderSeparator) {
      return <Border style={{ paddingTop: 15, marginBottom: 15 }} />
    }
    return (
      <View
        style={[
          !props.horizontal && { paddingTop: 15, marginBottom: 15 },
          ItemSeparatorComponentStyle,
        ]}
      />
    )
  }, [borderSeparator])

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
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={{
        flex: initialFetch ? 1 : 0,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        ...contentContainerStyle,
      }}
      {...props}
    />
  )
}

export default InfiniteList
