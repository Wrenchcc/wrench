import React, { useCallback, useEffect } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { PanGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { onGestureEvent, useValues, useClocks } from 'react-native-redash'

const INSET_TOP = 50

const {
  useCode,
  clockRunning,
  startClock,
  stopClock,
  timing,
  block,
  Value,
  eq,
  cond,
  and,
  not,
  set,
  or,
  add,
  lessThan,
  diffClamp,
  sub,
  call,
  Clock,
} = Animated

const slidingAnimationDuration = 350
const messageVisibilityDuration = 6000

interface AnimationWrapperProps {
  visible: boolean
  onFadeOut: () => void
  onPress: () => void
  children: React.ReactNode
}

const AnimationWrapper = ({ visible, onFadeOut, onPress, children }: AnimationWrapperProps) => {
  const [translateY, offset, translationY, velocityY, height] = useValues([0, 0, 0, 0, 0], [])

  const [slideAnimationFinished, isSlidingDown] = useValues([0, 0], [])

  const [gestureState] = useValues([State.UNDETERMINED], [])
  const [slideAnimationClock] = useClocks(1, [])

  const toValue = add(6, height, INSET_TOP)
  const hasGestureBegan = eq(gestureState, State.BEGAN)
  const isGestureActive = eq(gestureState, State.ACTIVE)

  useEffect(() => {
    if (visible) {
      isSlidingDown.setValue(1 as Animated.Adaptable<0>)
    } else {
      isSlidingDown.setValue(0)
    }
  }, [isSlidingDown, visible])

  useCode(() => {
    const state: Animated.TimingState = {
      finished: slideAnimationFinished,
      position: translateY,
      frameTime: new Value(0),
      time: new Value(0),
    }

    const config: Animated.TimingConfig = {
      toValue: cond(isSlidingDown, toValue, 0),
      duration: slidingAnimationDuration,
      easing: Easing.in(Easing.exp),
    }

    return block([
      cond(or(hasGestureBegan, isGestureActive), stopClock(slideAnimationClock)),
      cond(and(not(hasGestureBegan), not(isGestureActive)), [
        cond(and(not(clockRunning(slideAnimationClock)), not(eq(state.position, config.toValue))), [
          set(state.time, 0),
          set(state.frameTime, 0),
          set(state.finished, 0),
          startClock(slideAnimationClock),
        ]),
        cond(clockRunning(slideAnimationClock), timing(slideAnimationClock, state, config)),
      ]),
      cond(state.finished, [
        cond(isSlidingDown, 0, call([], onFadeOut)),
        stopClock(slideAnimationClock),
      ]),
    ])
  }, [])

  // cancelable timeout
  useCode(() => {
    const state: Animated.TimingState = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    }

    const config = {
      toValue: new Value(1),
      duration: messageVisibilityDuration,
      easing: Easing.linear,
    }

    const clock = new Clock()

    return block([
      cond(and(not(clockRunning(clock)), slideAnimationFinished, isSlidingDown), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, 0),
        set(state.frameTime, 0),
        startClock(clock),
      ]),
      cond(clockRunning(clock), timing(clock, state, config)),
      cond(or(eq(state.position, config.toValue), not(isSlidingDown)), [
        stopClock(clock),
        set(isSlidingDown, 0),
      ]),
    ])
  }, [])

  // handle gestures
  useCode(() => {
    return block([
      cond(hasGestureBegan, set(offset, translateY)),
      cond(isGestureActive, [
        set(translateY, add(offset, translationY)),
        cond(lessThan(velocityY, 0), [set(slideAnimationFinished, 0), set(isSlidingDown, 0)]),
      ]),
    ])
  }, [])

  const onGestureEventHandlers = onGestureEvent({
    translationY: translationY,
    state: gestureState,
    velocityY,
  })

  const handleOnLayout = useCallback<(event: LayoutChangeEvent) => void>(
    (event) => {
      height.setValue(event.nativeEvent.layout.height as Animated.Adaptable<0>)
    },
    [height]
  )

  return (
    <PanGestureHandler
      onHandlerStateChange={onGestureEventHandlers.onHandlerStateChange}
      onGestureEvent={onGestureEventHandlers.onGestureEvent}
    >
      <Animated.View
        onLayout={handleOnLayout}
        style={{
          transform: [
            {
              translateY: diffClamp(translateY, sub(0, height), toValue),
            },
          ],
          opacity: visible ? 1 : 0,
          position: 'absolute',
          width: '100%',
          zIndex: 1000000,
          top: sub(0, height),
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            isSlidingDown.setValue(0)
            onPress()
          }}
        >
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default AnimationWrapper
