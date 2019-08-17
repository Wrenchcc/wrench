import React from 'react'
import { View, Image } from 'react-native'
import { COLORS } from 'ui/constants'
import { fallback } from 'images'

function Placeholder({ style = {} }) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.LIGHT_GREY,
        flex: 1,
        justifyContent: 'center',
        ...style,
      }}
    >
      <Image source={fallback} />
    </View>
  )
}

export default Placeholder
