import React from 'react'
import { FlatList, View } from 'react-native'
import Border from 'ui/Border'
import Loader from 'ui/Loader'

const renderLoader = () => <Loader />
const renderFullscreenLoader = top => <Loader top={-top} />
const Separator = () => <View style={{ paddingBottom: 50 }} />
const BorderSeparator = () => <Border />

function InfiniteList({
  contentContainerStyle = {},
  paddingHorizontal = 20,
  defaultPaddingTop,
  paddingBottom,
  borderSeparator,
  data,
  isFetching,
  hasNextPage,
  fetchMore,
  refetch,
  isRefetching,
  ListEmptyComponent,
  initialNumToRender = 10,
  spacingSeparator,
  ...props
}) {
  const initialFetch = !data && isFetching
  const paddingTop = contentContainerStyle.paddingTop || (defaultPaddingTop && 20) || 0

  const onEndReached = () => {
    if (hasNextPage && isRefetching !== true && !isFetching) {
      fetchMore()
    }
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data}
      onRefresh={refetch}
      onEndReached={onEndReached}
      refreshing={isRefetching}
      initialNumToRender={initialNumToRender}
      ListFooterComponent={hasNextPage ? renderLoader() : null}
      ListEmptyComponent={initialFetch ? renderFullscreenLoader(paddingTop) : ListEmptyComponent}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        flex: initialFetch ? 1 : 0, // Fix for ListEmptyComponent to center loader
        justifyContent: 'center',
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop,
        paddingBottom:
          (paddingBottom && paddingBottom)
          || (!initialFetch && data && data.length > 0 && spacingSeparator && 60)
          || 0,
        ...contentContainerStyle,
      }}
      {...borderSeparator && { ItemSeparatorComponent: BorderSeparator }}
      {...spacingSeparator && {
        ItemSeparatorComponent: Separator,
      }}
      {...props}
    />
  )
}

export default InfiniteList
