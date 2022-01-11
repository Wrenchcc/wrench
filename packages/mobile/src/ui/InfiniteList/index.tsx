import React, { useCallback } from 'react'
import { FlatList, Keyboard } from 'react-native'
import { isAndroid } from 'utils/platform'
import Border from 'ui/Border'
import Loader from 'ui/Loader'
import { CONTENT_INSET, NAVIGATION } from 'navigation/constants'
import { keyExtractor } from 'navigation'

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onScrollEndDrag: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

const renderLoader = (loaderInset?) => <Loader inset={loaderInset} />
const BorderSeparator = () => <Border />

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
  androidDismissKeyboard = true,
  paddingBottom = NAVIGATION.BOTTOM_TABS_HEIGHT,
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
      {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
      {...(androidDismissKeyboard && keyboardDismissProp)}
      {...props}
    />
  )
}

export default InfiniteList
