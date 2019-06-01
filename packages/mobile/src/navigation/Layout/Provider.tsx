import React, { Component } from 'react'
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

export default class Provider extends Component {
  dragging = new Value(0)

  scrollY = new Value(0)

  scrollYClamped = new Value(0)

  scrollYDiff = new Value(0)

  translateY = new Value(0)

  targetTranslateY = new Value(0)

  endDragVelocity = new Value(0)

  translateYTarget = new Value(0)

  translateYSnap = new Value(0)

  isAndroid = new Value(isAndroid ? 1 : 0)

  constructor(props) {
    super(props)

    const {
      dragging,
      scrollY,
      scrollYClamped,
      scrollYDiff,
      translateY,
      endDragVelocity,
      translateYSnap,
    } = this

    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    }

    const config = {
      damping: 1,
      mass: 1,
      stiffness: 50,
      overshootClamping: true,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0),
    }

    const clock = new Clock()

    const snapOffset = cond(
      eq(dragging, 0),
      cond(
        or(
          eq(isAndroid, 0),
          and(neq(translateY, this.initialScroll), neq(translateY, -NAVIGATION.TOP_BAR_HEIGHT))
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
                greaterThan(scrollY, this.initialScroll + NAVIGATION.TOP_BAR_HEIGHT),
                sub(translateYSnap, translateY),
                multiply(-1, translateY)
              )
            ),
            startClock(clock),
          ]),
          spring(clock, state, config),
          cond(state.finished, [
            set(translateY, add(translateY, state.position)),
            stopClock(clock),
          ]),
          state.position,
        ])
      ),
      stopClock(clock)
    )

    this.finalTranslateY = add(translateY, snapOffset)

    this.onScroll = event(
      [
        {
          nativeEvent: ({ contentOffset }) => block([
            set(scrollY, contentOffset.y),
            set(scrollYClamped, max(this.initialScroll, contentOffset.y)),
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

    this.onScrollBeginDrag = event(
      [
        {
          nativeEvent: ({ zoomScale, target }) =>
            block([cond(defined(target), set(dragging, target), set(dragging, zoomScale))]), // eslint-disable-line
        },
      ],
      { useNativeDriver: true }
    )

    this.onScrollEndDrag = event(
      [
        {
          nativeEvent: ({ contentOffset, velocity }) => block([
            set(dragging, contentOffset.x),
            set(endDragVelocity, velocity.y),
            set(scrollY, contentOffset.y),
          ]),
        },
      ],
      { useNativeDriver: true }
    )
  }

  get contentInset() {
    return NAVIGATION.TOP_BAR_HEIGHT + NAVIGATION.STATUS_BAR_HEIGHT + NAVIGATION.LIST_INSET_TOP
  }

  get initialScroll() {
    return isAndroid ? 0 : -this.contentInset
  }

  render() {
    return (
      <ListContext.Provider
        value={{
          headerHeight: NAVIGATION.TOP_BAR_HEIGHT,
          initialScroll: this.initialScroll,
          contentInset: this.contentInset,
          translateY: this.finalTranslateY,
          onScroll: this.onScroll,
          onScrollBeginDrag: this.onScrollBeginDrag,
          onScrollEndDrag: this.onScrollEndDrag,
        }}
      >
        {this.props.children}
      </ListContext.Provider>
    )
  }
}
