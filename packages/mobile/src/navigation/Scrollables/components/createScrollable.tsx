import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { useScrollContext, ViewabilityItemsContext } from '../'
import { CONTENT_INSET } from '../../constants'
import { keyExtractor, getNodeIdByIndex } from '../../utils'

const renderLoader = (loaderInset) => <Loader inset={loaderInset} />

export default function createScrollable(Component) {
  return function Scrollable({
    contentContainerStyle = {},
    borderSeparator,
    data,
    isFetching,
    hasNextPage,
    fetchMore,
    refetch,
    isRefetching,
    ListEmptyComponent,
    initialNumToRender = 10,
    paddingHorizontal = 20,
    extraContentInset = 0,
    loaderInset = 0,
    progressViewOffset = CONTENT_INSET - 30,
    ...props
  }) {
    const [isRefetchingLocal, setRefresh] = useState(false)
    const { scrollHandler, scrollRef } = useScrollContext()
    const VIEW_OFFSET = isAndroid ? CONTENT_INSET + extraContentInset : 0

    const visibleItemId = useSharedValue(null)
    const visiblePostId = useSharedValue(null)

    const visibleIndexes = useSharedValue({})

    const setVisibleItemId = useCallback((id) => {
      visibleItemId.value = id
    }, [])

    const setVisibleIndex = useCallback((id, index) => {
      visibleIndexes.value = { ...visibleIndexes.value, [id]: index }
    }, [])

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
      const post = viewableItems[0]?.item
      const currentIndex = visibleIndexes.value[post?.node?.id]

      visiblePostId.value = post?.node?.id
      visibleItemId.value = getNodeIdByIndex(post, currentIndex)
    }, [])

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

    const initialFetch = !data && isFetching

    const context = useMemo(() => {
      return { visibleItemId, visiblePostId, setVisibleItemId, setVisibleIndex }
    }, [visibleItemId, visiblePostId, setVisibleItemId, setVisibleIndex])

    return (
      <ViewabilityItemsContext.Provider value={context}>
        <Component
          ref={scrollRef}
          onScroll={scrollHandler}
          scrollEventThrottle={1}
          style={{ flex: 1 }}
          data={data}
          onRefresh={refetch && onRefresh}
          onEndReached={onEndReached}
          progressViewOffset={progressViewOffset}
          refreshing={isRefetchingLocal}
          initialNumToRender={initialNumToRender}
          ListFooterComponent={hasNextPage && renderLoader(loaderInset)}
          ListEmptyComponent={initialFetch ? renderLoader(CONTENT_INSET) : ListEmptyComponent}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="always"
          keyExtractor={keyExtractor}
          contentInset={{ top: isAndroid ? 0 : CONTENT_INSET + extraContentInset }}
          contentOffset={{ y: -(CONTENT_INSET + extraContentInset) }}
          keyboardDismissMode="on-drag"
          onEndReachedThreshold={1}
          contentContainerStyle={{
            ...contentContainerStyle,
            flex: initialFetch ? 1 : 0,
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
            paddingTop: VIEW_OFFSET,
          }}
          {...(borderSeparator && { ItemSeparatorComponent: Border })}
          {...props}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            waitForInteractions: false,
            itemVisiblePercentThreshold: 40,
          }}
        />
      </ViewabilityItemsContext.Provider>
    )
  }
}
