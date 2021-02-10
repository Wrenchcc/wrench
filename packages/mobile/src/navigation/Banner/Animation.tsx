import React from 'react'
import { View } from 'react-native'

function Animation({ children }) {
  return <View style={{ top: 50 }}>{children}</View>
}

export default Animation

// import React, { useCallback, useEffect, useImperativeHandle } from 'react'
// import { LayoutChangeEvent } from 'react-native'
// import { PanGestureHandler, State } from 'react-native-gesture-handler'
// import Animated, { Easing } from 'react-native-reanimated'
// import TouchableHighlightContainer from 'ui/TouchableHighlightContainer'
// import { onGestureEvent, useValues, useClocks } from 'react-native-redash'
// import { Device } from 'ui/constants'

// const {
//   useCode,
//   clockRunning,
//   startClock,
//   stopClock,
//   timing,
//   block,
//   Value,
//   eq,
//   cond,
//   and,
//   not,
//   set,
//   or,
//   add,
//   lessThan,
//   diffClamp,
//   sub,
//   greaterThan,
//   call,
//   Clock,
// } = Animated

// const SLIDE_IN_DURATION = 200
// const SLIDE_OUT_DURATION = 150
// const DURATION = 4000

// interface AnimationWrapperProps {
//   children: React.ReactNode
//   dismissAfter?: number
//   gestureEnabled?: boolean
//   onPress: () => void
//   onSlideIn?: () => void
//   onSlideOut?: () => void
//   safeInsetTop?: number
// }

// const AnimationWrapper = React.forwardRef(
//   (
//     {
//       children,
//       dismissAfter = DURATION,
//       gestureEnabled = true,
//       onPress,
//       onSlideIn,
//       onSlideOut,
//       safeInsetTop = Device.SAFE_INSET_TOP,
//     }: AnimationWrapperProps,
//     ref
//   ) => {
//     const [translateY, offset, translationY, velocityY, height] = useValues([0, 0, 0, 0, 0], [])
//     const [slideAnimationFinished, isSlidingDown] = useValues([0, 0], [])
//     const [gestureState] = useValues([State.UNDETERMINED], [])
//     const [slideAnimationClock] = useClocks(1, [])
//     const toValue = add(height, safeInsetTop)
//     const isHeightReady = greaterThan(height, 0)
//     const hasGestureBegan = eq(gestureState, State.BEGAN)
//     const isGestureActive = eq(gestureState, State.ACTIVE)
//     useImperativeHandle(ref, () => ({
//       onDismiss() {
//         isSlidingDown.setValue(1 as Animated.Adaptable<0>)
//       },
//     }))
//     useEffect(() => {
//       isSlidingDown.setValue(1 as Animated.Adaptable<0>)
//       return () => isSlidingDown.setValue(0)
//     }, [isSlidingDown])
//     useCode(() => {
//       const state: Animated.TimingState = {
//         finished: slideAnimationFinished,
//         position: translateY,
//         frameTime: new Value(0),
//         time: new Value(0),
//       }
//       const config: Animated.TimingConfig = {
//         toValue: cond(isSlidingDown, toValue, 0),
//         duration: cond(isSlidingDown, SLIDE_IN_DURATION, SLIDE_OUT_DURATION),
//         easing: Easing.inOut(Easing.ease),
//       }
//       return block([
//         cond(or(hasGestureBegan, isGestureActive), stopClock(slideAnimationClock)),
//         cond(and(not(hasGestureBegan), not(isGestureActive)), [
//           cond(
//             and(
//               isHeightReady,
//               not(clockRunning(slideAnimationClock)),
//               not(eq(state.position, config.toValue))
//             ),
//             [
//               set(state.time, 0),
//               set(state.frameTime, 0),
//               set(state.finished, 0),
//               startClock(slideAnimationClock),
//             ]
//           ),
//           cond(clockRunning(slideAnimationClock), timing(slideAnimationClock, state, config)),
//         ]),
//         cond(state.finished, [
//           cond(
//             isSlidingDown,
//             onSlideIn ? call([], onSlideIn) : 0,
//             onSlideOut ? call([], onSlideOut) : 0
//           ),
//           stopClock(slideAnimationClock),
//         ]),
//       ])
//     }, [])
//     // cancelable timeout
//     useCode(() => {
//       const state: Animated.TimingState = {
//         finished: new Value(0),
//         position: new Value(0),
//         time: new Value(0),
//         frameTime: new Value(0),
//       }
//       const config = {
//         toValue: new Value(1),
//         duration: dismissAfter,
//         easing: Easing.linear,
//       }
//       const clock = new Clock()
//       return block([
//         cond(and(not(clockRunning(clock)), slideAnimationFinished, isSlidingDown), [
//           set(state.finished, 0),
//           set(state.time, 0),
//           set(state.position, 0),
//           set(state.frameTime, 0),
//           startClock(clock),
//         ]),
//         cond(clockRunning(clock), timing(clock, state, config)),
//         cond(or(eq(state.position, config.toValue), not(isSlidingDown)), [
//           stopClock(clock),
//           set(isSlidingDown, 0),
//         ]),
//       ])
//     }, [])
//     // handle gestures
//     useCode(
//       () =>
//         block([
//           cond(hasGestureBegan, set(offset, translateY)),
//           cond(isGestureActive, [
//             set(translateY, add(offset, translationY)),
//             cond(lessThan(velocityY, 0), [set(slideAnimationFinished, 0), set(isSlidingDown, 0)]),
//           ]),
//         ]),
//       []
//     )
//     const onGestureEventHandlers = onGestureEvent({
//       translationY: translationY,
//       state: gestureState,
//       velocityY,
//     })
//     const handleOnLayout = useCallback<(event: LayoutChangeEvent) => void>(
//       (event) => {
//         height.setValue(event.nativeEvent.layout.height as Animated.Adaptable<0>)
//       },
//       [height]
//     )
//     return (
//       <PanGestureHandler
//         enabled={gestureEnabled}
//         onHandlerStateChange={onGestureEventHandlers.onHandlerStateChange}
//         onGestureEvent={onGestureEventHandlers.onGestureEvent}
//       >
//         <Animated.View
//           onLayout={handleOnLayout}
//           style={{
//             transform: [
//               {
//                 translateY: diffClamp(translateY, sub(0, height), toValue),
//               },
//             ],
//             opacity: cond(isHeightReady, 1, 0),
//             position: 'absolute',
//             width: '100%',
//             zIndex: 1000,
//             top: sub(0, height),
//           }}
//         >
//           <TouchableHighlightContainer
//             onPress={() => {
//               isSlidingDown.setValue(0)
//               onPress()
//             }}
//           >
//             {children}
//           </TouchableHighlightContainer>
//         </Animated.View>
//       </PanGestureHandler>
//     )
//   }
// )
// export default AnimationWrapper
