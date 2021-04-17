import React, { useEffect, useRef, useCallback, forwardRef } from 'react'
import { Keyboard, TextInput, UIManager, findNodeHandle } from 'react-native'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { keyExtractor } from '../utils'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = 10

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onMomentumScrollBegin: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

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
        scrollEventThrottle={1}
        style={{ flex: 1 }}
        data={data}
        onRefresh={refetch}
        onEndReached={onEndReached}
        refreshing={isRefetching}
        initialNumToRender={initialNumToRender}
        ListFooterComponent={hasNextPage && renderLoader(loaderInset)}
        ListEmptyComponent={initialFetch ? renderLoader(0) : ListEmptyComponent}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          ...contentContainerStyle,
          flex: initialFetch ? 1 : 0,
          paddingBottom,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          paddingTop: 20,
        }}
        {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
        {...keyboardDismissProp}
        {...props}
      />
    )
  })
}
