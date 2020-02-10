import React, { useEffect, useRef, useCallback, forwardRef, useContext } from 'react'
import { Keyboard, TextInput, UIManager } from 'react-native'
import { ScrollContext } from 'navigation/Layout/context'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { CONTENT_INSET } from '../constants'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = isAndroid ? 28 : 10

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onMomentumScrollBegin: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

const renderLoader = fullscreen => <Loader fullscreen={fullscreen} />
const BorderSeparator = () => <Border />

const keyExtractor = ({ node }) => node.id

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
      paddingBottom,
      ...props
    },
    ref
  ) {
    const scrollRef = useRef()
    const { onScroll, onScrollBeginDrag, onScrollEndDrag } = useContext(ScrollContext)

    // Scroll to input
    useEffect(() => {
      const keyboardEventListener = Keyboard.addListener(KEYBOARD_EVENT_LISTENER, () => {
        const currentlyFocusedField = TextInput.State.currentlyFocusedField()
        const scrollResponder =
          scrollRef.current && scrollRef.current.getNode().getScrollResponder()

        if (!scrollResponder || !currentlyFocusedField) {
          return
        }

        UIManager.viewIsDescendantOf(
          currentlyFocusedField,
          scrollResponder.getInnerViewNode(),
          isAncestor => {
            if (isAncestor) {
              scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                currentlyFocusedField,
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
      c => {
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
        initialNumToRender={initialNumToRender}
        ListFooterComponent={hasNextPage && renderLoader(false)}
        ListEmptyComponent={initialFetch ? renderLoader(true) : ListEmptyComponent}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        contentInset={{ top: isAndroid ? 0 : CONTENT_INSET + extraContentInset }}
        contentOffset={{ y: -(CONTENT_INSET + extraContentInset) }}
        contentContainerStyle={{
          ...contentContainerStyle,
          flex: initialFetch ? 1 : 0,
          paddingBottom,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          paddingTop: isAndroid ? CONTENT_INSET + extraContentInset : 0,
        }}
        {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
        {...keyboardDismissProp}
        {...props}
      />
    )
  })
}
