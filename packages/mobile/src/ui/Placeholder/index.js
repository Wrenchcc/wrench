import React, { memo } from 'react'
import { View, Image } from 'react-native'
import { COLORS } from 'ui/constants'
import { fallback } from 'images'

const Placeholder = memo(function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image source={fallback} />
    </View>
  )
})

export default Placeholder
