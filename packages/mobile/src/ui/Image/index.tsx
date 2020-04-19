import React, { memo, useState } from 'react'
import { PixelRatio, Animated, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base } from './styles'
import Spinner from '../Spinner'

const PROGRESS_COLOR = '#E1E1E2'

const density = PixelRatio.get()

const OLD_CDN = 'https://edge-files.wrench.cc'
const CDN_ENDPOINT = 'https://d3iwj6zs5f9xbz.cloudfront.net'

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
}) {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  // NOTE: Guard for crash on Android
  if (!source.uri) {
    return null
  }

  const uri = `${source.uri.replace(
    OLD_CDN,
    `${CDN_ENDPOINT}/unsafe/fit/${Math.round(width * density)}/${Math.round(
      height * density
    )}/no/0/plain/s3://wrench-files`
  )}@webp`

  const placeholder = `${source.uri.replace(
    OLD_CDN,
    `${CDN_ENDPOINT}/unsafe/fit/${Math.round(width / placeholderDensity)}/${Math.round(
      height / placeholderDensity
    )}/no/0/plain/s3://wrench-files`
  )}@webp`

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
        source={{ uri }}
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
        priority={priority || IMAGE_PRIORITY.NORMAL}
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
