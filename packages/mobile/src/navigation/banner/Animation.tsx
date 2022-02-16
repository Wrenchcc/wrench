import React, { forwardRef, useEffect, useCallback, useImperativeHandle } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  withDelay,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'
import { clamp, snapPoint } from 'utils/animations'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { STATUS_BAR_HEIGHT } from 'navigation/constants'

const FULLY_UP = -60
const FULLY_DOWN = STATUS_BAR_HEIGHT + 5

const styles = {
  base: {
    top: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
  },
} as any

const Animation = (
  { children, dismissAfter, onSlideIn, onSlideOut, onPress, gestureEnabled },
  ref
) => {
  const translateY = useSharedValue(FULLY_UP)

  useImperativeHandle(ref, () => ({
    onDismiss() {
      translateY.value = withSpring(FULLY_UP, { mass: 0.5 }, (isFinished) => {
        if (isFinished) {
          runOnJS(onSlideOut)()
        }
      })
    },
  }))

  useEffect(() => {
    translateY.value = withSpring(FULLY_DOWN, { mass: 0.5 }, (isFinished) => {
      runOnJS(onSlideIn)()

      if (isFinished && dismissAfter) {
        translateY.value = withDelay(
          dismissAfter,
          withSpring(FULLY_UP, { mass: 0.5 }, (isFinished) => {
            if (isFinished) {
              runOnJS(onSlideOut)()
            }
          })
        )
      }
    })
  }, [translateY, dismissAfter, onSlideOut])

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value
    },
    onActive: (evt, ctx) => {
      translateY.value = clamp(ctx.startY + evt.translationY, FULLY_UP, FULLY_DOWN)
    },
    onEnd: (evt) => {
      translateY.value = withTiming(
        // WTF
        snapPoint(translateY.value * -5, evt.velocityX, [FULLY_UP, FULLY_DOWN]),
        null,
        () => {
          runOnJS(onSlideOut)()
        }
      )
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  const handleOnPress = useCallback(() => {
    if (onPress) {
      onPress()

      translateY.value = withSpring(FULLY_UP, { mass: 0.5 }, (isFinished) => {
        if (isFinished) {
          runOnJS(onSlideOut)()
        }
      })
    }
  }, [onPress, translateY])

  // NOTE: We need TouchableOpacity from RN instead of RNGH
  return (
    <TouchableOpacity onPress={handleOnPress} disabled={!Boolean(onPress)} activeOpacity={1}>
      <PanGestureHandler onGestureEvent={gestureHandler} enabled={gestureEnabled}>
        <Animated.View style={[styles.base, animatedStyle]}>{children}</Animated.View>
      </PanGestureHandler>
    </TouchableOpacity>
  )
}

export default forwardRef(Animation)
