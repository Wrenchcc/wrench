import React from 'react'
import { hasNotch } from 'utils/platform'
import Animated, { Easing } from 'react-native-reanimated'
import { useTransition, useSetTimeout } from './animationRunners'

const TOP = hasNotch ? 60 : 40

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
    inputRange: [0, 1],
    outputRange: [-TOP, HEIGHT],
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
        top: TOP,
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
