import React from 'react'
import { ImageProps, View } from 'react-native'
import Touchable, { TouchablePropsType } from 'ui/Touchable'
import { Base } from './styles'

type IconProps = {
  onPress?: () => void
  opacity?: number
  color?: string
} & ImageProps &
  TouchablePropsType

function Icon({
  onPress = () => {},
  source,
  opacity = 1,
  color,
  width,
  height,
  style = {},
  ...rest
}: IconProps) {
  // TODO: Set height and width explicitly everywhere
  return (
    <View style={style}>
      <Touchable onPress={onPress} {...rest}>
        <Base source={source} width={width} height={height} color={color} opacity={opacity} />
      </Touchable>
    </View>
  )
}
export default Icon
