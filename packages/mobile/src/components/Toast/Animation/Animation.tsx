import React from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { NAVIGATION } from 'navigation/constants'
import { useTransition, useSetTimeout } from './animationRunners'

const { eq, interpolate } = Animated

type Props = {
  children: React.ReactNode
  onAnimationCompleted: () => void
  onHide: () => void
  visible: boolean
  dismissAfter?: number
}

const HEIGHT = 40

const Animation: React.FC<Props> = ({
  children,
  onAnimationCompleted,
  onHide,
  visible,
  dismissAfter,
}) => {
  const animation = useTransition(visible, {
    duration: 250,
    easing: Easing.ease,
    onAnimationCompleted: ([position]) => {
      if (position === 0) {
        onAnimationCompleted()
      }
    },
  })

  const translateY = interpolate(animation, {
    inputRange: [0, 0.7, 1],
    outputRange: [0, HEIGHT, HEIGHT],
  })

  useSetTimeout({
    startWhen: eq(animation, 1),
    stopWhen: eq(animation, 0),
    onTimeoutFinished: onHide,
    timeout: dismissAfter || 0,
  })

  return (
    <Animated.View
      style={{
        top: NAVIGATION.TOP_BAR_HEIGHT,
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  )
}

export default Animation
