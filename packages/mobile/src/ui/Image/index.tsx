import React, { useState } from 'react'
import { PixelRatio, Animated, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { IMAGE_PRIORITY } from 'ui/constants'
import Progress from './Progress'
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
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
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
          width,
          height,
          opacity: imageAnimated,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
        priority={priority || IMAGE_PRIORITY.NORMAL}
        onLoad={onImageLoad}
      />
      {false && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Progress
            value={progress}
            size={80}
            thickness={1.5}
            color="black"
            unfilledColor="white"
            animationMethod="spring"
            animationConfig={{ speed: 4 }}
          />
        </View>
      )}
    </Base>
  )
}

export default Image
