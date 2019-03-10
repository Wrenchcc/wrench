import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base, FastImage } from './styles'

const Image = memo(function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  priority,
  ...props
}) {
  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
    >
      <FastImage
        {...props}
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
}

export default Image
