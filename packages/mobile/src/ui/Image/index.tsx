import React, { memo } from 'react'
import { PixelRatio, Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base } from './styles'

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)

const density = PixelRatio.get()

function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  priority,
  source,
  placeholderDensity = 8,
  ...props
}) {
  // NOTE: Guard for crash on Android
  if (!source.uri) {
    return null
  }

  const uri = `${source.uri}?w=${width}&h=${height}&dpr=${density}&webp=1`

  const placeholder = `${source.uri}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
    height / placeholderDensity
  )}&dpr=1`

  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
    >
      <Animated.Image
        {...props}
        source={{
          uri: placeholder,
        }}
        style={{ width, height }}
        blurRadius={3}
      />
      <AnimatedFastImage
        {...props}
        source={{ uri }}
        style={{
          bottom: 0,
          height,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          width,
        }}
        priority={priority || IMAGE_PRIORITY.NORMAL}
      />
    </Base>
  )
}

export default memo(Image)
