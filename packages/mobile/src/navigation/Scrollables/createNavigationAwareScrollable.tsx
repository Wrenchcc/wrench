import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { ListContext } from '../Layout/context'

function createNavigationAwareScrollable(Component) {
  return ({
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
    spacingSeparator,
    tabIndex,
    ...props
  }) => {
    const {
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      initialScroll,
      contentInset,
    } = useContext(ListContext)

    const scrollRef = useRef()

    useEffect(() => {
      const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
        ({ selectedTabIndex, unselectedTabIndex }) => {
          if (selectedTabIndex === unselectedTabIndex && selectedTabIndex === tabIndex) {
            scrollRef.current
              && scrollRef.current.getNode().scrollToOffset({ offset: initialScroll })
          }
        }
      )

      return () => bottomTabEventListener.remove()
    }, [])

    const onEndReached = useCallback(() => {
      if (hasNextPage && isRefetching !== true && !isFetching) {
        fetchMore()
      }
    }, [hasNextPage, isRefetching, isFetching])

    const renderLoader = fullscreen => <Loader fullscreen={fullscreen} />

    const initialFetch = !data && isFetching

    return (
      <Component
        ref={scrollRef}
        scrollEventThrottle={1}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        contentInset={{ top: isAndroid ? 0 : contentInset }}
        contentOffset={{ y: initialScroll }}
        style={{ flex: 1 }}
        data={data}
        onRefresh={refetch}
        onEndReached={onEndReached}
        refreshing={isRefetching}
        initialNumToRender={initialNumToRender}
        ListFooterComponent={hasNextPage ? renderLoader() : null}
        ListEmptyComponent={initialFetch ? renderLoader(true) : ListEmptyComponent}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        keyExtractor={({ node }) => node.id}
        contentContainerStyle={{
          flex: initialFetch ? 1 : 0,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          paddingTop: isAndroid ? contentInset : 0,
          ...contentContainerStyle,
        }}
        {...borderSeparator && { ItemSeparatorComponent: () => <Border /> }}
        {...spacingSeparator && {
          ItemSeparatorComponent: () => <View style={{ paddingBottom: 50 }} />,
        }}
        {...props}
      />
    )
  }
}

export default createNavigationAwareScrollable
