import React, { memo, Fragment, useRef, cloneElement } from 'react'
import Animated from 'react-native-reanimated'
import { RefreshControl } from 'react-native'
import Header from './Header'

const OFFSET = 70

const { event, set, Value, cond, eq } = Animated

type Props = {
  headerTitle: string
  children: array
  headerRight: any
  footer: any
  headerAnimation: bool
}

function PageLayout({ children, headerTitle, headerRight, footer, headerAnimation }: Props) {
  const scrollY = useRef(new Value(-OFFSET))

  return (
    <Fragment>
      <Header
        headerTitle={headerTitle}
        scrollY={scrollY.current}
        headerRight={headerRight}
        headerAnimation={headerAnimation}
      />

      {cloneElement(children, {
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

      {footer}
    </Fragment>
  )
}

export default memo(PageLayout)
