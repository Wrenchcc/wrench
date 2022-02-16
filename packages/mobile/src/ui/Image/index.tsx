import React, { useState, useCallback, useRef } from 'react'
import { Animated, View, ImageProps } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import { IMAGE_PRIORITY } from 'ui/constants'
import PlatformColor from 'ui/PlatformColor'
import Spinner from '../Spinner'

const PROGRESS_COLOR = '#E1E1E2'

const density = 3

type ImageComponentProps = {
  placeholderColor?: string
  placeholderDensity?: number
  borderColor?: string
  borderWidth?: number
  priority?: 'low' | 'normal' | 'high'
  showIndicator?: boolean
  width: number
  height: number
} & ImageProps &
  FastImageProps

const styles = {
  base: {
    overflow: 'hidden',
  },
  image: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  indicator: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  priority,
  source,
  placeholderDensity = 8,
  borderColor,
  borderWidth,
  showIndicator,
  style = {},
  ...props
}: ImageComponentProps) {
  const [progress, setProgress] = useState(0)
  const loading = useRef(false)

  if ((__DEV__ && !width) || !height) {
    console.warn('You need to define both width and height prop to the <Image /> component.')
  }

  const uri = source.poster || source.uri

  const handleLoadStart = useCallback(() => {
    if (showIndicator && !loading.current && progress !== 1) {
      loading.current = true
    }
  }, [showIndicator, loading, progress])

  const handleLoadEnd = useCallback(() => {
    if (showIndicator) {
      loading.current = false
      setProgress(1)
    }
  }, [showIndicator])

  const handleError = useCallback(() => {
    if (showIndicator) {
      loading.current = false
    }
  }, [showIndicator])

  const handleProgress = useCallback((evt) => {
    if (showIndicator) {
      const loaded = evt.nativeEvent.loaded / evt.nativeEvent.total
      if (loaded !== progress && progress !== 1) {
        loading.current = loaded < 1
        setProgress(loaded)
      }
    }
  }, [])

  const imageUri = `${uri}?w=${width}&h=${height}&dpr=${density}&webp=1`

  const placeholder = `${uri}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
    height / placeholderDensity
  )}&dpr=1`

  // NOTE: Guard for crash on Android
  if (!uri) {
    return null
  }

  return (
    <View
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      style={[
        styles.base,
        {
          borderRadius: borderRadius || 0,
          backgroundColor: placeholderColor || PlatformColor.placeholder,
        },
        style,
      ]}
    >
      <Animated.Image
        {...props}
        source={{
          uri: placeholder,
        }}
        fadeDuration={0}
        style={[{ width, height }, style]}
        blurRadius={3}
      />

      <FastImage
        {...props}
        source={{ uri: imageUri, priority: priority || IMAGE_PRIORITY.NORMAL }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onProgress={handleProgress}
        onError={handleError}
        style={[
          styles.image,
          {
            width,
            height,
            borderColor,
            borderRadius,
            borderWidth,
          },
        ]}
      />

      {showIndicator && progress < 1 ? (
        <View style={styles.indicator}>
          <Spinner
            size={80}
            width={1.3}
            progress={progress * 100}
            color={PROGRESS_COLOR}
            backgroundColor={PROGRESS_COLOR}
            fullColor="black"
          />
        </View>
      ) : null}
    </View>
  )
}

export default Image
