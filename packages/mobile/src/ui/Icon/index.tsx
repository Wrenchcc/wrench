import React from 'react'
import { Image } from 'react-native'
import { COLORS } from '../constants'
import { toUpper } from 'ramda'
import Touchable from 'ui/Touchable'

function Icon({ onPress = () => {}, source, opacity = 1, color, ...rest }) {
  const tintColor = color && COLORS[toUpper(color)]

  return (
    <Touchable onPress={onPress} {...rest}>
      <Image source={source} style={{ opacity, tintColor }} />
    </Touchable>
  )
}
export default Icon
