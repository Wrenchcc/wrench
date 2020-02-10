import React, { useRef, cloneElement, useCallback, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { NAVIGATION } from '../constants'

const { event, set, Value } = Animated

function Page({
  scrollPosition,
  children,
  headerTitle,
  headerLeft,
  headerRight,
  stickyFooter,
  headerAnimation,
  scrollToIndex,
}) {
  const scrollRef = useRef()
  const scrollY = useRef(new Value(-NAVIGATION.LIST_OFFSET))

  useEffect(() => {
    if (scrollToIndex && scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ top: 600 })
    }
  }, [scrollRef, scrollToIndex])

  return (
    <>
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
      })}

      {stickyFooter}
      {scrollPosition && <Animated.Code exec={Animated.set(scrollPosition, scrollY.current)} />}
    </>
  )
}

export default Page
