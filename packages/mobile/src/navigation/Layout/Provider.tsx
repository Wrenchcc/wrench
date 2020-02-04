import React, { useRef, useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { NAVIGATION, CONTENT_INSET } from 'navigation/constants'
import { isAndroid as _isAndroid } from 'utils/platform'
import { ScrollContext } from './context'

const {
  add,
  and,
  block,
  Clock,
  clockRunning,
  cond,
  diff,
  eq,
  event,
  greaterOrEq,
  greaterThan,
  max,
  min,
  multiply,
  neq,
  or,
  set,
  spring,
  startClock,
  stopClock,
  sub,
  Value,
} = Animated

const HEADER_HEIGHT = NAVIGATION.TOP_BAR_HEIGHT

function Provider({ children, extraContentInset }) {
  const INITIAL_SCROLL_OFFSET = -(CONTENT_INSET + extraContentInset)

  const scrollY = useRef(new Value(0))
  const clock = useRef(new Clock())
  const scrollYClamped = useRef(new Value(0))
  const scrollYDiff = useRef(new Value(0))
  const dragging = useRef(new Value(0))
  const translateY = useRef(new Value(0))
  const endDragVelocity = useRef(new Value(0))
  const translateYSnap = useRef(new Value(0))
  const isAndroid = useRef(new Value(_isAndroid ? 1 : 0))

  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = {
    toValue: new Value(0),
    damping: 50,
    mass: 0.3,
    stiffness: 121.6,
    overshootClamping: true,
    restSpeedThreshold: 0.3,
    restDisplacementThreshold: 0.3,
    deceleration: 0.999,
    bouncyFactor: 1,
    velocityFactor: 1,
    toss: 0.4,
    coefForTranslatingVelocities: 5,
  }

  const snapOffset = cond(
    eq(dragging.current, 0),
    cond(
      or(
        eq(isAndroid.current, 0),
        and(neq(translateY.current, INITIAL_SCROLL_OFFSET), neq(translateY.current, -HEADER_HEIGHT))
      ),
      block([
        cond(clockRunning(clock.current), 0, [
          set(state.finished, 0),
          set(state.velocity, endDragVelocity.current),
          set(state.position, 0),
          set(
            translateYSnap.current,
            cond(greaterOrEq(translateY.current, HEADER_HEIGHT / -2), 0, -HEADER_HEIGHT)
          ),
          set(
            config.toValue,
            cond(
              greaterThan(scrollY.current, INITIAL_SCROLL_OFFSET + HEADER_HEIGHT),
              sub(translateYSnap.current, translateY.current),
              multiply(-1, translateY.current)
            )
          ),
          startClock(clock.current),
        ]),
        spring(clock.current, state, config),
        cond(state.finished, [
          set(translateY.current, add(translateY.current, state.position)),
          stopClock(clock.current),
        ]),
        state.position,
      ])
    ),
    stopClock(clock.current)
  )

  const finalTranslateY = add(translateY.current, snapOffset)

  const onScroll = event(
    [
      {
        nativeEvent: ({ contentOffset }) =>
          block([
            set(scrollY.current, contentOffset.y),
            set(scrollYClamped.current, max(INITIAL_SCROLL_OFFSET, contentOffset.y)),
            set(scrollYDiff.current, diff(scrollYClamped.current)),
            cond(
              neq(dragging.current, 0),
              [
                set(
                  translateY.current,
                  min(0, max(-HEADER_HEIGHT, sub(translateY.current, scrollYDiff.current)))
                ),
                translateY.current,
              ],
              0
            ),
          ]),
      },
    ],
    { useNativeDriver: true }
  )

  const onScrollBeginDrag = useCallback(() => dragging.current.setValue(1), [])
  const onScrollEndDrag = useCallback(() => dragging.current.setValue(0), [])

  return (
    <ScrollContext.Provider
      value={{
        headerHeight: HEADER_HEIGHT,
        onScroll,
        onScrollBeginDrag,
        onScrollEndDrag,
        translateY: finalTranslateY,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export default Provider
