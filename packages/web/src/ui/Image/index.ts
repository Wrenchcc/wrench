import React, { memo } from 'react'
import { Base, Picture } from './styles'

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
      {...props}
    >
      <Picture src={`${source}?w=${width}&h=${height}&type=square&webp=1`} />
    </Base>
  )
})

export default Image
