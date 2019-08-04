import React, { useContext, useEffect, useRef, useCallback, forwardRef } from 'react'
import { View, Keyboard, TextInput, UIManager } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { currentComponentName } from 'navigation'
import { ListContext } from '../Layout/context'
import { NAVIGATION, SCREENS } from '../constants'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'

// NOTE: https://github.com/facebook/react-native/issues/23364
const keyboardDismissProp = isAndroid
  ? { onScrollEndDrag: Keyboard.dismiss }
  : { keyboardDismissMode: 'on-drag' }

const renderLoader = fullscreen => <Loader fullscreen={fullscreen} />
const Separator = () => <View style={{ paddingBottom: 50 }} />
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
      spacingSeparator,
      tabIndex,
      componentId,
      ...props
    },
    ref
  ) {
    const {
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      initialScroll,
      contentInset,
    } = useContext(ListContext)

    const scrollRef = useRef()

    // Scroll to top
    useEffect(() => {
      const scrollableNode = getNode(scrollRef)

      const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
        ({ selectedTabIndex, unselectedTabIndex }) => {
          if (
            (selectedTabIndex === unselectedTabIndex &&
              selectedTabIndex === tabIndex &&
              scrollRef.current &&
              currentComponentName === SCREENS.FEED) ||
            currentComponentName === SCREENS.EXPLORE ||
            currentComponentName === SCREENS.NOTIFICATIONS ||
            currentComponentName === SCREENS.ME
          ) {
            if (scrollableNode.scrollToOffset != null) {
              scrollableNode.scrollToOffset({ offset: initialScroll })
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

        if (!scrollResponder || !currentlyFocusedField || isAndroid) {
          return
        }

        UIManager.viewIsDescendantOf(
          currentlyFocusedField,
          scrollResponder.getInnerViewNode(),
          isAncestor => {
            if (isAncestor) {
              scrollResponder.scrollResponderScrollNativeHandleToKeyboard(currentlyFocusedField)
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
        ListFooterComponent={hasNextPage && renderLoader()}
        ListEmptyComponent={initialFetch ? renderLoader(true) : ListEmptyComponent}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          flex: initialFetch ? 1 : 0,
          paddingBottom:
            (paddingBottom && paddingBottom) ||
            (!initialFetch && data && data.length > 0 && spacingSeparator && 60) ||
            0,
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          // NOTE: contentInset on layout NAVIGATION.LIST_OFFSET on page
          paddingTop: isAndroid ? contentInset || NAVIGATION.LIST_OFFSET : 0,
          ...contentContainerStyle,
        }}
        {...(borderSeparator && { ItemSeparatorComponent: BorderSeparator })}
        {...(spacingSeparator && {
          ItemSeparatorComponent: Separator,
        })}
        {...keyboardDismissProp}
        {...props}
      />
    )
  })
}
