import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { PixelRatio, Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base } from './styles'

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)

const density = PixelRatio.get()

const Image = memo(function Image({
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

  const imageAnimated = new Animated.Value(0)

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start()
  }

  const uri = `${source.uri}?w=${width}&h=${height}&dpr=${density}&webp=1`

  const placeholder = `${source.uri}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
    height / placeholderDensity
  )}&dpr=1&blur=1&blurRadius=10&webp=1`

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
        source={{ uri }}
        priority={priority || IMAGE_PRIORITY.NORMAL}
        onLoad={onImageLoad}
      />
    </Base>
  )
})

Image.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  placeholderColor: PropTypes.string,
  priority: PropTypes.string,
  source: PropTypes.object,
  placeholderDensity: PropTypes.number,
}

export default Image
