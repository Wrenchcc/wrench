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
  const src = `${source}?w=${width}&h=${height}`

  return (
    <Base
      width={width}
      height={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      {...props}
    >
      <Picture>
        <source
          srcSet={`${src}&webp=1 1x, ${src}&dpr=2&webp=1 2x, ${src}&dpr=3&webp=1 3x`}
          type="image/webp"
        />
        <source srcSet={`${src} 1x, ${src}&dpr=2 2x, ${src}&dpr=3 3x`} type="image/jpeg" />
        <img src={src} />
      </Picture>
    </Base>
  )
})

export default Image
