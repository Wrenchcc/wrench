import { useLayoutEffect } from 'react'
import { Navigation } from 'react-native-navigation'
import { componentId, currentComponentName } from '../actions'

type ScrollOptions = { y?: number; animated?: boolean }

type ScrollableView =
  | { scrollToTop(): void }
  | { scrollTo(options: ScrollOptions): void }
  | { scrollToOffset(options: ScrollOptions): void }
  | { scrollResponderScrollTo(options: ScrollOptions): void }

type ScrollableWrapper =
  | { getScrollResponder(): ScrollableView }
  | { getNode(): ScrollableView }
  | ScrollableView

function getScrollableNode(ref: React.RefObject<ScrollableWrapper>) {
  if (ref.current == null) {
    return null
  }

  if (
    'scrollToTop' in ref.current ||
    'scrollTo' in ref.current ||
    'scrollToOffset' in ref.current ||
    'scrollResponderScrollTo' in ref.current
  ) {
    // This is already a scrollable node.
    return ref.current
  } else if ('getScrollResponder' in ref.current) {
    // If the view is a wrapper like FlatList, SectionList etc.
    // We need to use `getScrollResponder` to get access to the scroll responder
    return ref.current.getScrollResponder()
  } else if ('getNode' in ref.current) {
    // When a `ScrollView` is wraped in `Animated.createAnimatedComponent`
    // we need to use `getNode` to get the ref to the actual scrollview.
    // Note that `getNode` is deprecated in newer versions of react-native
    // this is why we check if we already have a scrollable node above.
    return ref.current.getNode()
  } else {
    return ref.current
  }
}

export default function useScrollToTop(ref: React.RefObject<ScrollableWrapper>, name) {
  useLayoutEffect(() => {
    const unsubscribe = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        // We should scroll to top only when the screen is focused
        const isFocused = currentComponentName === name

        // Run the operation in the next frame so we're sure all listeners have been run
        // This is necessary to know if preventDefault() has been called
        requestAnimationFrame(() => {
          const scrollable = getScrollableNode(ref)

          if (isFocused && selectedTabIndex === unselectedTabIndex && scrollable) {
            if ('scrollToTop' in scrollable) {
              scrollable.scrollToTop()
            } else if ('scrollTo' in scrollable) {
              scrollable.scrollTo({ y: 0, animated: true })
            } else if ('scrollToOffset' in scrollable) {
              scrollable.scrollToOffset({ y: 0, animated: true, offset: -1000 })
            } else if ('scrollResponderScrollTo' in scrollable) {
              scrollable.scrollResponderScrollTo({ y: 0, animated: true })
            }
          }
        })
      }
    )

    return () => unsubscribe.remove()
  }, [ref, componentId])
}
