import React from 'react'
import Animated from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { DRAG_BAR } from '../constants'

function Dragbar({ gestureHandler }) {
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 100,
          width: '100%',
          height: DRAG_BAR,
        }}
      />
    </PanGestureHandler>
  )
}

export default Dragbar
