import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, TextInput, UIManager, findNodeHandle } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { ScrollContext } from 'navigation/Layout/context'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { CONTENT_INSET, NAVIGATION } from '../constants'
import { keyExtractor } from '../utils'
import { ViewabilityItemsContext, ViewabilityItemsContextType } from './context'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = 10

const renderLoader = (loaderInset) => <Loader inset={loaderInset} />
const BorderSeparator = () => <Border />

const getNodeIdByIndex = (post, index = 0) => {
  return post?.node?.files?.edges[index]?.node?.id
}

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onScrollEndDrag: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

export default function createNavigationAwareScrollable(Component) {
  return forwardRef(function NavigationAwareScrollable(
    {
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
      androidDismissKeyboard = true,
      paddingBottom = NAVIGATION.BOTTOM_TABS_HEIGHT,
      progressViewOffset = CONTENT_INSET - 30,
      ...props
    },
    ref
  ) {
    const scrollRef = useRef(null)
    const [isRefetchingLocal, setRefresh] = useState(false)

    const { onScroll, onScrollBeginDrag, onScrollEndDrag } = useContext(ScrollContext)
    const VIEW_OFFSET = isAndroid ? CONTENT_INSET + extraContentInset : 0

    const visibleItemId = useSharedValue<ViewabilityItemsContextType>(null)
    const visiblePostId = useSharedValue<ViewabilityItemsContextType>(null)
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

    // Scroll to input
    useEffect(() => {
      const keyboardEventListener = Keyboard.addListener(KEYBOARD_EVENT_LISTENER, () => {
        const currentlyFocusedInput = findNodeHandle(TextInput.State.currentlyFocusedInput())
        const scrollResponder = scrollRef.current && scrollRef.current.getScrollResponder()

        if (!scrollResponder || !currentlyFocusedInput) {
          return
        }

        UIManager.viewIsDescendantOf(
          currentlyFocusedInput,
          scrollResponder.getInnerViewNode(),
          (isAncestor) => {
            if (isAncestor) {
              scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                currentlyFocusedInput,
                KEYBOARD_OFFSET
              )
            }
          }
        )
      })

      return () => keyboardEventListener.remove()
    }, [scrollRef])

    const onEndReached = useCallback(() => {
      if (hasNextPage && isRefetching !== true && !isFetching) {
        fetchMore()
      }
    }, [hasNextPage, isRefetching, isFetching, fetchMore])

    const setRef = useCallback(
      (c) => {
        if (ref) {
          ref.current = c
        }
        if (scrollRef) {
          scrollRef.current = c
        }
      },
      [ref, scrollRef]
    )

    const initialFetch = !data && isFetching

    return (
      <ViewabilityItemsContext.Provider
        value={{ visibleItemId, visiblePostId, setVisibleItemId, setVisibleIndex }}
      >
        <Component
          ref={setRef}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
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
            paddingBottom,
          }}
          {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
          {...(androidDismissKeyboard && keyboardDismissProp)}
          {...props}
          onViewableItemsChanged={onViewableItemsChanged}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={false}
          viewabilityConfig={{
            waitForInteractions: true,
            itemVisiblePercentThreshold: 70,
            minimumViewTime: 100,
          }}
        />
      </ViewabilityItemsContext.Provider>
    )
  })
}
