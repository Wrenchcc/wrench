import React, { memo, useState } from 'react'
import { PixelRatio, Animated, View, ImageProps } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base } from './styles'
import Spinner from '../Spinner'

const PROGRESS_COLOR = '#E1E1E2'

const density = PixelRatio.get()

type ImageComponentProps = {
  placeholderColor?: string
  placeholderDensity?: number
  borderColor?: string
  borderWidth?: number
  priority?: 'low' | 'normal' | 'high'
  showIndicator?: boolean
} & ImageProps &
  FastImageProps

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
  ...props
}: ImageComponentProps) {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  // NOTE: Guard for crash on Android
  if (!source.uri) {
    return null
  }

  const handleLoadStart = () => {
    if (showIndicator && !loading && progress !== 1) {
      setLoading(true)
    }
  }

  const handleLoadEnd = () => {
    if (showIndicator) {
      setLoading(false)
      setProgress(1)
    }
  }

  const handleError = () => {
    if (showIndicator) {
      setLoading(false)
    }
  }

  const handleProgress = (evt) => {
    if (showIndicator) {
      const loaded = evt.nativeEvent.loaded / evt.nativeEvent.total
      if (loaded !== progress && progress !== 1) {
        setLoading(loaded < 1)
        setProgress(loaded)
      }
    }
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

      <FastImage
        {...props}
        source={{ uri, priority: priority || IMAGE_PRIORITY.NORMAL }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onProgress={handleProgress}
        onError={handleError}
        style={{
          borderColor,
          borderRadius,
          borderWidth,
          bottom: 0,
          height,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          width,
        }}
      />

      {(showIndicator && loading) || (showIndicator && progress < 1) ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
    </Base>
  )
}

export default memo(Image)
