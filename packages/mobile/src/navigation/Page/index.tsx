import React, { useRef, cloneElement, useCallback, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { NAVIGATION } from '../constants'
import Header from './Header'

const { call, event, set, Value, cond, eq } = Animated

function Page({
  scrollPosition,
  children,
  headerTitle,
  headerRight,
  stickyFooter,
  headerAnimation,
  scrollToIndex,
}) {
  const scrollRef = useRef()
  const scrollY = useRef(new Value(-NAVIGATION.LIST_OFFSET))

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ offset: -NAVIGATION.LIST_OFFSET })
    }
  }, [scrollRef])

  useEffect(() => {
    if (scrollToIndex && scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ top: 600 })
    }
  }, [scrollRef, scrollToIndex])

  return (
    <>
      <Header
        headerTitle={headerTitle}
        scrollY={scrollY.current}
        headerRight={headerRight}
        headerAnimation={headerAnimation}
        onPress={scrollToTop}
      />

      {cloneElement(children, {
        contentInset: {
          top: NAVIGATION.LIST_OFFSET,
        },
        contentOffset: {
          y: -NAVIGATION.LIST_OFFSET,
        },
        onScroll: event(
          [
            {
              nativeEvent: ({ contentOffset }) => set(scrollY.current, contentOffset.y),
            },
          ],
          { useNativeDriver: true }
        ),
        ref: scrollRef,
        scrollEventThrottle: 1,
      })}

      {stickyFooter}
      {scrollPosition && <Animated.Code exec={Animated.set(scrollPosition, scrollY.current)} />}
    </>
  )
}

export default Page
