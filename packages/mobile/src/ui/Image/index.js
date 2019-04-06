import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { PixelRatio } from 'react-native'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base, FastImage } from './styles'

const density = PixelRatio.get()

const Image = memo(function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  priority,
  source,
  ...props
}) {
  // NOTE: Guard for crash on Android
  if (!source.uri) {
    return null
  }

  const uri = `${source.uri}?w=${width}&h=${height}&dpr=${density}&webp=1`

  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
    >
      <FastImage
        {...props}
        source={{ uri }}
        width={width}
        height={height}
        priority={priority || IMAGE_PRIORITY.NORMAL}
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
}

export default Image
