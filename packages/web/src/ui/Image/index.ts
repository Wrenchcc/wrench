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
  const src = `${source}?w=${width}&h=${height}&type=square&webp=1`

  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      {...props}
    >
      <Picture srcSet={`${src} 1x, ${src}&dpr=2 2x, ${src}&dpr=3 3x`} src={src} />
    </Base>
  )
})

export default Image
