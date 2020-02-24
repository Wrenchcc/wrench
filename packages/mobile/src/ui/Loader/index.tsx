import React from 'react'
import { View } from 'react-native'
import ActivityIndicator from 'ui/ActivityIndicator'
import { CONTENT_INSET } from 'navigation'

function Loader({ size = 'small', color = 'inverse', padding = 32, fullscreen = false }) {
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
