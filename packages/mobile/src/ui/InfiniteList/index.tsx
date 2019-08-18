import React, { useCallback } from 'react'
import { FlatList, View, Keyboard } from 'react-native'
import { isAndroid } from 'utils/platform'
import Border from 'ui/Border'
import Loader from 'ui/Loader'

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onScrollEndDrag: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

const renderLoader = (fullscreen, loaderPosition) => (
  <Loader fullscreen={fullscreen} top={loaderPosition} />
)
const Separator = () => <View style={{ paddingBottom: 50 }} />
const BorderSeparator = () => <Border />
const keyExtractor = ({ node }) => node.id

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
  loaderPosition,
  androidDismiss = true,
  ...props
}) {
  const initialFetch = !data && isFetching
  const paddingTop = contentContainerStyle.paddingTop || (defaultPaddingTop && 20) || 0

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
      onRefresh={refetch}
      onEndReached={onEndReached}
      refreshing={isRefetching}
      initialNumToRender={initialNumToRender}
      ListFooterComponent={hasNextPage ? renderLoader() : null}
      ListEmptyComponent={initialFetch ? renderLoader(true, loaderPosition) : ListEmptyComponent}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        flex: initialFetch ? 1 : 0,
        paddingBottom:
          (paddingBottom && paddingBottom) ||
          (!initialFetch && data && data.length > 0 && spacingSeparator && 60) ||
          0,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop,
        ...contentContainerStyle,
      }}
      {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
      {...(spacingSeparator && {
        ItemSeparatorComponent: Separator,
      })}
      {...(androidDismiss && keyboardDismissProp)}
      {...props}
    />
  )
}

export default InfiniteList
