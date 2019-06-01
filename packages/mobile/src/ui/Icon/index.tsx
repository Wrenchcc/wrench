import React from 'react'
import { Image } from 'react-native'
import Touchable from 'ui/Touchable'

function Icon({ onPress = () => {}, source, opacity = 1, ...rest }) {
  return (
    <Touchable onPress={onPress} {...rest}>
      <Image source={source} style={{ opacity }} />
    </Touchable>
  )
}

export default Icon
