import React from 'react'
import { ImageProps, View, Image } from 'react-native'
import Touchable, { TouchablePropsType } from 'ui/Touchable'
import PlatformColor from 'ui/PlatformColor'

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
          fadeDuration={0}
          source={source}
          style={{
            opacity,
            tintColor: PlatformColor[color] || PlatformColor.inverse,
            ...(width && { width }),
            ...(height && { height }),
          }}
        />
      </Touchable>
    </View>
  )
}
export default Icon
