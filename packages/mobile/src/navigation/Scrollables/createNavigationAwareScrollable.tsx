import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { View, Keyboard, TextInput, UIManager } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { isAndroid } from 'utils/platform'
import { Border, Loader } from 'ui'
import { ListContext } from '../Layout/context'

const KEYBOARD_EVENT_LISTENER = isAndroid ? 'keyboardDidShow' : 'keyboardWillShow'

const renderLoader = fullscreen => <Loader fullscreen={fullscreen} />
const Separator = () => <View style={{ paddingBottom: 50 }} />
const BorderSeparator = () => <Border />

export default function createNavigationAwareScrollable(Component) {
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
    componentId,
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

    // Scroll to top
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
    }, [scrollRef, tabIndex])

    // Scroll to input
    useEffect(() => {
      const keyboardEventListener = Keyboard.addListener(KEYBOARD_EVENT_LISTENER, () => {
        const currentlyFocusedField = TextInput.State.currentlyFocusedField()
        const scrollResponder = scrollRef.current.getNode().getScrollResponder()

        if (!scrollResponder || !currentlyFocusedField) {
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
    }, [hasNextPage, isRefetching, isFetching])

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
        ListFooterComponent={hasNextPage && renderLoader()}
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
        {...borderSeparator && { ItemSeparatorComponent: BorderSeparator }}
        {...spacingSeparator && {
          ItemSeparatorComponent: Separator,
        }}
        {...props}
      />
    )
  }
}
