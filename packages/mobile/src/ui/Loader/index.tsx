import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from 'ui/constants'

function Loader({ size = 'small', color = COLORS.DARK, padding = 32, fullscreen = false }) {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding,
        ...(fullscreen
          ? {
              bottom: 0,
              left: 0,
              position: 'absolute',
              right: 0,
              top: -200,
            }
          : {}),
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loader
