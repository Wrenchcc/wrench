import React from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { NAVIGATION } from 'navigation'
import { HEADER_HEIGHT, CROP_AREA } from '../constants'

function Opacity({ opacity }) {
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          zIndex: 1,
          top: HEADER_HEIGHT + NAVIGATION.STATUS_BAR_HEIGHT,
          width: CROP_AREA,
          height: CROP_AREA,
          backgroundColor: '#000',
        },
        opacityStyle,
      ]}
    />
  )
}

export default Opacity
