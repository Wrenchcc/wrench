import React, { useState, useEffect } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { useTransition, useSetTimeout } from './animationRunners'

const { eq, interpolate } = Animated

type Props = {
  children: React.ReactNode
  onAnimationCompleted: () => void
  visible: boolean
  dismissAfter?: number
}

const HEIGHT = 40

const Animation: React.FC<Props> = ({
  children,
  onAnimationCompleted,
  visible: visibleAsProp,
  dismissAfter,
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const animation = useTransition(visible, {
    duration: 220,
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
    onTimeoutFinished: () => setVisible(false),
    timeout: dismissAfter || 0,
  })

  useEffect(() => {
    setVisible(visibleAsProp && HEIGHT > 0)
  }, [visibleAsProp, HEIGHT])

  return (
    <Animated.View
      style={{
        top: -HEIGHT,
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
