import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from 'ui/constants'

type Props = {
  size: string
  color: string
  padding: number
  fullscreen: bool
}

function Loader({ size = 'small', color = COLORS.DARK, padding = 32, fullscreen = false }: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding,
        ...(fullscreen
          ? {
            position: 'absolute',
            top: -200,
            left: 0,
            right: 0,
            bottom: 0,
          }
          : {}),
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loader
