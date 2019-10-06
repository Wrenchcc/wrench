import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from 'ui/constants'
import { CONTENT_INSET } from 'navigation'

function Loader({ size = 'small', color = COLORS.DARK, padding = 32, fullscreen = false }) {
  return (
    <View
      pointerEvents="none"
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding,
        ...(fullscreen
          ? {
              marginTop: -CONTENT_INSET,
            }
          : {}),
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loader
