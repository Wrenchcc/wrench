import React, { FC, useMemo } from 'react'
import {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { isAndroid } from 'utils/platform'
import { useScrollToInput } from '../hooks'
import { ScrollContext } from './context'
import { clamp, snapPoint } from './worklets'
import { CONTENT_INSET, NAVIGATION } from '../constants'

export default function withScrollableContext<T>(Component: FC<T>, extraContentInset = 0) {
  return (props: T) => {
    const scrollRef = useAnimatedRef()
    const headerY = useSharedValue(0)
    const scrollY = useSharedValue(0)
    const scrollVelocity = useSharedValue({ x: 0, y: 0 })
    const initialViewOffset = isAndroid ? 0 : -CONTENT_INSET - extraContentInset

    useScrollToInput(scrollRef)

    const scrollHandler = useAnimatedScrollHandler<{
      beginOffset: number
    }>({
      onScroll: (evt, ctx) => {
        const velocityY = scrollVelocity.value.y
        const direction = evt.contentOffset.y > ctx.beginOffset ? 'down' : 'up'

        scrollY.value = evt.contentOffset.y - initialViewOffset

        if (evt.velocity !== undefined) {
          scrollVelocity.value = evt.velocity
        }

        // When pressing tab or scroll to top
        // NOTE: Velocity is always 0 in emulator
        if (direction === 'up' && scrollVelocity.value.y === 0) {
          headerY.value = withTiming(0, { duration: 100 })
        }

        const isScrollingUp = evt.contentOffset.y - ctx.beginOffset < -300
        const velocityThreshold = Math.abs(velocityY) > 0.2

        if (direction === 'up' && velocityThreshold && isScrollingUp && headerY.value !== 0) {
          headerY.value = withSpring(0, {
            mass: 0.5,
            velocity: velocityY,
          })
        }

        if (direction === 'down' || scrollY.value <= 0) {
          headerY.value = withSpring(clamp(scrollY.value, 0, NAVIGATION.TOP_BAR_HEIGHT), {
            mass: 0.5,
            velocity: velocityY,
          })
        }
      },
      onBeginDrag: (evt, ctx) => {
        ctx.beginOffset = evt.contentOffset.y

        // FIXME: evt.velocity is declared as NativeScrollVelocity | undefined
        // FIXME: Can it be that evt.velocity be undefined?
        if (evt.velocity !== undefined) {
          scrollVelocity.value = evt.velocity
        }
      },
      onEndDrag: (evt, ctx) => {
        const direction = evt.contentOffset.y > ctx.beginOffset ? 'down' : 'up'
        const velocityY = evt.velocity.y
        const snapPointY = snapPoint(headerY.value, evt.velocity.y, [0, NAVIGATION.TOP_BAR_HEIGHT])

        headerY.value = withSpring(snapPointY, { mass: 0.5, velocity: velocityY })

        if (evt.velocity !== undefined) {
          scrollVelocity.value = evt.velocity
        }

        if (direction === 'down' && scrollY.value <= NAVIGATION.TOP_BAR_HEIGHT) {
          headerY.value = withSpring(0, {
            mass: 0.5,
            velocity: velocityY,
          })
        }
      },
      onMomentumBegin: (evt) => {
        if (evt.velocity !== undefined) {
          scrollVelocity.value = evt.velocity
        }
      },
      onMomentumEnd: (evt) => {
        if (evt.velocity !== undefined) {
          scrollVelocity.value = evt.velocity
        }
      },
    })

    const context = useMemo(() => {
      return {
        scrollRef,
        scrollHandler,
        scrollY,
        scrollVelocity,
        headerY,
        scrollTo: (offset: number, animate?: boolean) => {
          scrollRef.current?.scrollToOffset({ offset, animate })
        },
      }
    }, [scrollRef, scrollHandler, scrollY, scrollVelocity])

    return (
      <ScrollContext.Provider value={context}>
        <Component {...props} />
      </ScrollContext.Provider>
    )
  }
}
