import React from 'react'
import { View } from 'react-native'
import ActivityIndicator from 'ui/ActivityIndicator'

function Loader({ size = 'small', color = 'inverse', padding = 32, inset = 0 }) {
  return (
    <View
      pointerEvents="none"
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding,
        marginTop: -inset,
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loader
