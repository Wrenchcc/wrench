import React, { useRef, cloneElement, useEffect, useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { KeyboardAvoidingView } from 'ui'
import Header from './Header'
import { NAVIGATION } from '../constants'

const { event, set, Value } = Animated

function Page({
  children,
  stickyFooter,
  scrollToIndex,
  headerTitle,
  headerSubTitle,
  headerRight,
  headerLeft,
  headerAnimation,
  view,
  keyboardVerticalOffset = 0,
  paddingHorizontal = 0,
}) {
  const scrollRef = useRef(null)
  const scrollY = useRef(new Value(-NAVIGATION.LIST_OFFSET))

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: -NAVIGATION.LIST_OFFSET })
    }
  }, [scrollRef])

  useEffect(() => {
    if (scrollToIndex && scrollRef.current) {
      scrollRef.current.scrollToOffset({ top: 600 })
    }
  }, [scrollRef, scrollToIndex])

  return (
    <KeyboardAvoidingView
      paddingHorizontal={paddingHorizontal}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Header
        headerTitle={headerTitle}
        headerSubTitle={headerSubTitle}
        scrollY={scrollY.current}
        headerLeft={headerLeft}
        headerRight={headerRight}
        headerAnimation={headerAnimation}
        onPress={scrollToTop}
      />

      {view
        ? children
        : cloneElement(children, {
            onScroll: event(
              [
                {
                  nativeEvent: ({ contentOffset }) => set(scrollY.current, contentOffset.y),
                },
              ],
              { useNativeDriver: true }
            ),
            ref: scrollRef,
          })}

      {stickyFooter}
    </KeyboardAvoidingView>
  )
}

export default Page
