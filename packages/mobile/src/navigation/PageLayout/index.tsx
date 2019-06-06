import React, { Fragment, useRef, cloneElement, useCallback, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { RefreshControl } from 'react-native'
import Header from './Header'

const { event, set, Value, cond, eq } = Animated

const OFFSET = 70

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
      scrollRef.current.getNode().scrollToOffset({ offset: 0 })
    }
  }, [scrollRef])

  useEffect(() => {
    if (scrollToIndex && scrollRef.current) {
      scrollRef.current.getNode().scrollToIndex({ animated: false, index: 0 })
    }
  }, [scrollRef, scrollToIndex])

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default PageLayout
