import React from 'react'
import { ImageProps, View } from 'react-native'
import Touchable, { TouchablePropsType } from 'ui/Touchable'
import PlatformColor from 'ui/PlatformColor'
import { props } from 'rambda'

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
        <Image
          source={source}
          style={{
            opacity,
            tintColor: PlatformColor[props.color] || PlatformColor.inverse,
            width,
            height,
          }}
        />
      </Touchable>
    </View>
  )
}
export default Icon
