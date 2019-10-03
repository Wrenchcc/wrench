import React, { useEffect, useRef, useCallback, forwardRef } from 'react'
import { Keyboard, TextInput, UIManager } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { currentComponentName } from 'navigation'
import { SCREENS } from '../constants'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'
const KEYBOARD_OFFSET = isAndroid ? 28 : 0

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onMomentumScrollBegin: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

const renderLoader = fullscreen => <Loader fullscreen={fullscreen} />
const BorderSeparator = () => <Border />

const keyExtractor = ({ node }) => node.id

function getNode(ref) {
  if (ref.current === null) {
    return null
  }

  if (ref.current.getScrollResponder) {
    return ref.current.getScrollResponder()
  } else if (ref.current.getNode) {
    return ref.current.getNode()
  } else {
    return ref.current
  }
}

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
      paddingBottom,
      tabIndex,
      componentId,
      ...props
    },
    ref
  ) {
    const scrollRef = useRef()

    // Scroll to top
    useEffect(() => {
      const scrollableNode = getNode(scrollRef)

      const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
        ({ selectedTabIndex, unselectedTabIndex }) => {
          if (
            (selectedTabIndex === unselectedTabIndex &&
              selectedTabIndex === tabIndex &&
              currentComponentName === SCREENS.FEED) ||
            (selectedTabIndex === unselectedTabIndex &&
              selectedTabIndex === tabIndex &&
              currentComponentName === SCREENS.EXPLORE) ||
            (selectedTabIndex === unselectedTabIndex &&
              selectedTabIndex === tabIndex &&
              currentComponentName === SCREENS.NOTIFICATIONS) ||
            (selectedTabIndex === unselectedTabIndex &&
              selectedTabIndex === tabIndex &&
              currentComponentName === SCREENS.ME)
          ) {
            if (scrollableNode.scrollToOffset !== null) {
              scrollableNode.scrollToOffset({ offset: 0 })
            }
          }
        }
      )

      return () => bottomTabEventListener.remove()
    }, [scrollRef, tabIndex])

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
        contentContainerStyle={{
          ...contentContainerStyle,
          flex: initialFetch ? 1 : 0,
          paddingBottom,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
        }}
        {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
        {...keyboardDismissProp}
        {...props}
      />
    )
  })
}
