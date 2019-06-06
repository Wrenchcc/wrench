import React, { useState } from 'react'
import { PixelRatio, Animated, View } from 'react-native'
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

  const [progress, setProgress] = useState(0)

  const onProgress = evt => setProgress(evt.nativeEvent.loaded / evt.nativeEvent.total)

  const imageAnimated = new Animated.Value(0)

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const uri = `${source.uri}?w=${width}&h=${height}&dpr=${density}&webp=1`

  const placeholder = `${source.uri}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
    height / placeholderDensity
  )}&dpr=1&blurRadius=10&webp=1`

  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
    >
      <AnimatedFastImage
        {...props}
        source={{ uri: placeholder }}
        style={{ width, height }}
        priority={priority || IMAGE_PRIORITY.NORMAL}
      />
      <AnimatedFastImage
        {...props}
        onProgress={onProgress}
        source={{ uri }}
        style={{
          bottom: 0,
          height,
          left: 0,
          opacity: imageAnimated,
          position: 'absolute',
          right: 0,
          top: 0,
          width,
        }}
        priority={priority || IMAGE_PRIORITY.NORMAL}
        onLoad={onImageLoad}
      />
    </Base>
  )
}

export default Image
