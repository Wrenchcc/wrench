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
  const uri = `${source.uri}?width=${width ? width * density : 'auto'}&height=${
    height ? height * density : 'auto'
  }&webp=true`

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
  source: PropTypes.object.isRequired,
}

export default Image
