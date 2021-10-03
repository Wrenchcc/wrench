import React, { useEffect, useRef, useCallback, forwardRef, useContext } from 'react'
import { Keyboard, TextInput, UIManager, RefreshControl, findNodeHandle } from 'react-native'
import { ScrollContext } from 'navigation/Layout/context'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { CONTENT_INSET } from '../constants'
import { keyExtractor } from '../utils'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = 10

const renderLoader = (loaderInset) => <Loader inset={loaderInset} />
const BorderSeparator = () => <Border />

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
      paddingBottom,
      ...props
    },
    ref
  ) {
    const scrollRef = useRef(null)
    const { onScroll, onScrollBeginDrag, onScrollEndDrag } = useContext(ScrollContext)
    const VIEW_OFFSET = isAndroid ? CONTENT_INSET + extraContentInset : 0

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
        // TODO: Remove transparent when fixed: https://github.com/facebook/react-native/issues/30912
        refreshControl={
          refetch && (
            <RefreshControl
              style={{ backgroundColor: 'transparent' }}
              progressViewOffset={VIEW_OFFSET}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          )
        }
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
        contentContainerStyle={{
          ...contentContainerStyle,
          flex: initialFetch ? 1 : 0,
          paddingBottom,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          paddingTop: VIEW_OFFSET,
        }}
        {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
        {...props}
      />
    )
  })
}
