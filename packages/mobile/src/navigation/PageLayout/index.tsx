import React, { useRef, cloneElement, useCallback, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import Header from './Header'

const { event, set, Value, cond, eq } = Animated

const OFFSET = 120

function PageLayout({
  children,
  headerTitle,
  headerRight,
  stickyFooter,
  headerAnimation,
  scrollToIndex,
}) {
  const scrollRef = useRef()
  const scrollY = useRef(new Value(-OFFSET))

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.getNode().scrollToOffset({ offset: -OFFSET })
    }
  }, [scrollRef])

  useEffect(() => {
    if (scrollToIndex && scrollRef.current) {
      scrollRef.current.getNode().scrollToIndex({ index: 0 })
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
          top: OFFSET,
        },
        contentOffset: {
          y: -OFFSET,
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
    </>
  )
}

export default PageLayout
