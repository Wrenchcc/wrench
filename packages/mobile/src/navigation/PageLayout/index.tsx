import React, { Fragment, useRef, cloneElement, useCallback, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import { RefreshControl } from 'react-native'
import Header from './Header'

const { event, set, Value, cond, eq } = Animated

const OFFSET = 70

type Props = {
  headerTitle: string
  children: array
  headerRight: any
  footer: any
  headerAnimation: bool
}

function PageLayout({
  children,
  headerTitle,
  headerRight,
  stickyFooter,
  headerAnimation,
  scrollToIndex,
}: Props) {
  const scrollRef = useRef()
  const scrollY = useRef(new Value(-OFFSET))

  const scrollToTop = useCallback(() => {
    scrollRef.current && scrollRef.current.getNode().scrollToOffset({ offset: 0 })
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
        ref: scrollRef,
        contentInset: {
          top: OFFSET,
        },
        contentOffset: {
          y: -OFFSET,
        },
        scrollEventThrottle: 1,
        onScroll: event(
          [
            {
              nativeEvent: ({ contentOffset }) => set(scrollY.current, contentOffset.y),
            },
          ],
          { useNativeDriver: true }
        ),
      })}

      {stickyFooter}
    </Fragment>
  )
}

export default PageLayout
