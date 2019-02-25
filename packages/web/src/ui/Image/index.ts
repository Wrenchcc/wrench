import React, { memo } from 'react'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base } from './styles'

const Image = memo(function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  style,
  source,
  ...props
}) {
  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
    >
      <img src={source} width={width} height={height} style={{ width: '100%', height: '100%' }} />
    </Base>
  )
})

export default Image
