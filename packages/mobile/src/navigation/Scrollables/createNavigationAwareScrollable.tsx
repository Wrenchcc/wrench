import React, { forwardRef, useCallback, useContext, useMemo, useEffect, useRef } from 'react'
import { Keyboard, TextInput, UIManager, findNodeHandle } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { ScrollContext } from 'navigation/Layout/context'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { CONTENT_INSET, MAX_VIEWABLE_ITEMS, NAVIGATION } from '../constants'
import { keyExtractor } from '../utils'
import { ViewabilityItemsContext, ViewabilityItemsContextType, ItemKeyContext } from './context'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = 10

const renderLoader = (loaderInset) => <Loader inset={loaderInset} />
const BorderSeparator = () => <Border />

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
      renderItem: _renderItem,
      ...props
    },
    ref
  ) {
    const scrollRef = useRef(null)
    const { onScroll, onScrollBeginDrag, onScrollEndDrag } = useContext(ScrollContext)
    const VIEW_OFFSET = isAndroid ? CONTENT_INSET + extraContentInset : 0

    const visibleItems = useSharedValue<ViewabilityItemsContextType>([])

    const renderItem = useCallback(
      (params: any) => (
        <ItemKeyContext.Provider value={keyExtractor(params.item)}>
          {_renderItem?.(params)}
        </ItemKeyContext.Provider>
      ),
      [_renderItem]
    )

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
      visibleItems.value = viewableItems
        .slice(0, MAX_VIEWABLE_ITEMS)
        .map((edge: any) => keyExtractor(edge.item))
    }, [])

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
      <ViewabilityItemsContext.Provider value={visibleItems}>
        <Component
          ref={setRef}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
          style={{ flex: 1 }}
          data={data}
          onRefresh={refetch}
          onEndReached={onEndReached}
          refreshing={isRefetching}
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
          renderItem={renderItem}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={useMemo(
            () => ({
              waitForInteractions: false,
              itemVisiblePercentThreshold: 70,
              minimumViewTime: 100,
            }),
            []
          )}
        />
      </ViewabilityItemsContext.Provider>
    )
  })
}
