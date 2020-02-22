import React from 'react'
import Touchable from 'ui/Touchable'
import { Base } from './styles'

function Icon({ onPress = () => {}, source, opacity = 1, color, width, height, ...rest }) {
  // TODO: Set height and width explicitly everywhere
  return (
    <Touchable onPress={onPress} {...rest}>
      <Base source={source} width={width} height={height} color={color} opacity={opacity} />
    </Touchable>
  )
}
export default Icon
