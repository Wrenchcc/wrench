import React from 'react'
import Animated from 'react-native-reanimated'
import { isAndroid } from 'utils/platform'
import { NAVIGATION } from '../constants'
import { ListContext } from './context'

const {
  or,
  and,
  multiply,
  greaterThan,
  defined,
  event,
  Value,
  block,
  cond,
  set,
  add,
  startClock,
  clockRunning,
  stopClock,
  Clock,
  sub,
  spring,
  neq,
  eq,
  greaterOrEq,
  diff,
  max,
  min,
} = Animated

const contentInset =
  NAVIGATION.TOP_BAR_HEIGHT + NAVIGATION.STATUS_BAR_HEIGHT + NAVIGATION.LIST_INSET_TOP

function Provider({ children }) {
  const dragging = new Value(0)
  const scrollY = new Value(0)
  const scrollYClamped = new Value(0)
  const scrollYDiff = new Value(0)
  const translateY = new Value(0)
  const endDragVelocity = new Value(0)
  const translateYSnap = new Value(0)
  const androidValue = new Value(isAndroid ? 1 : 0)

  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: new Value(0),
  }

  const config = {
    damping: 1,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
    stiffness: 50,
    toValue: new Value(0),
  }

  const initialScroll = isAndroid ? 0 : -contentInset

  const clock = new Clock()

  const snapOffset = cond(
    eq(dragging, 0),
    cond(
      or(
        eq(androidValue, 0),
        and(neq(translateY, initialScroll), neq(translateY, -NAVIGATION.TOP_BAR_HEIGHT))
      ),
      block([
        cond(clockRunning(clock), 0, [
          set(state.finished, 0),
          set(state.velocity, endDragVelocity),
          set(state.position, 0),
          set(
            translateYSnap,
            cond(
              greaterOrEq(translateY, NAVIGATION.TOP_BAR_HEIGHT / -2),
              0,
              -NAVIGATION.TOP_BAR_HEIGHT
            )
          ),
          set(
            config.toValue,
            cond(
              greaterThan(scrollY, initialScroll + NAVIGATION.TOP_BAR_HEIGHT),
              sub(translateYSnap, translateY),
              multiply(-1, translateY)
            )
          ),
          startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, [set(translateY, add(translateY, state.position)), stopClock(clock)]),
        state.position,
      ])
    ),
    stopClock(clock)
  )

  const finalTranslateY = add(translateY, snapOffset)

  const onScroll = event(
    [
      {
        nativeEvent: ({ contentOffset }) =>
          block([
            set(scrollY, contentOffset.y),
            set(scrollYClamped, max(initialScroll, contentOffset.y)),
            set(scrollYDiff, diff(scrollYClamped)),
            cond(
              neq(dragging, 0),
              [
                set(
                  translateY,
                  min(0, max(-NAVIGATION.TOP_BAR_HEIGHT, sub(translateY, scrollYDiff)))
                ),
                translateY,
              ],
              0
            ),
          ]),
      },
    ],
    { useNativeDriver: true }
  )

  const onScrollBeginDrag = event(
    [
      {
        nativeEvent: ({ zoomScale, target }) =>
          block([cond(defined(target), set(dragging, target), set(dragging, zoomScale))]),
      },
    ],
    { useNativeDriver: true }
  )

  const onScrollEndDrag = event(
    [
      {
        nativeEvent: ({ contentOffset, velocity }) =>
          block([
            set(dragging, contentOffset.x),
            set(endDragVelocity, velocity.y),
            set(scrollY, contentOffset.y),
          ]),
      },
    ],
    { useNativeDriver: true }
  )

  return (
    <ListContext.Provider
      value={{
        contentInset,
        headerHeight: NAVIGATION.TOP_BAR_HEIGHT,
        initialScroll,
        onScroll,
        onScrollBeginDrag,
        onScrollEndDrag,
        translateY: finalTranslateY,
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export default Provider
