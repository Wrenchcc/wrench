import React from 'react'
import { ImageProps } from 'react-native'
import Touchable, { TouchableProps } from 'ui/Touchable'
import { Base } from './styles'

type IconProps = {
  onPress?: () => void
  opacity?: number
  color?: string
} & ImageProps &
  TouchableProps

function Icon({
  onPress = () => {},
  source,
  opacity = 1,
  color,
  width,
  height,
  ...rest
}: IconProps) {
  // TODO: Set height and width explicitly everywhere
  return (
    <Touchable onPress={onPress} {...rest}>
      <Base source={source} width={width} height={height} color={color} opacity={opacity} />
    </Touchable>
  )
}
export default Icon
