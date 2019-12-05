import React from 'react'
import { Image } from 'react-native'
import { COLORS } from '../constants'
import { toUpper } from 'rambda'
import Touchable from 'ui/Touchable'

function Icon({ onPress = () => {}, source, opacity = 1, color, width, height, ...rest }) {
  const tintColor = color && COLORS[toUpper(color)]

  // TODO: Set height and width explicitly everywhere
  return (
    <Touchable onPress={onPress} {...rest}>
      <Image
        source={source}
        style={{ opacity, tintColor, ...(width && height && { width, height }) }}
      />
    </Touchable>
  )
}
export default Icon
