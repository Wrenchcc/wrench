// @ts-nocheck
import React from 'react'
import { Base, Picture } from './styles'

function Image({
  width,
  height,
  borderRadius,
  placeholderColor,
  style,
  source,
  placeholderDensity = 8,
  ...props
}) {
  const src = `${source}?w=${width}&h=${height}`
  const placeholder = `${source}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
    height / placeholderDensity
  )}&dpr=1`

  return (
    <Base
      w={width}
      h={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      {...props}
    >
      <Picture>
        <source
          srcSet={`${src}&webp=1 1x, ${src}&dpr=2&webp=1 2x, ${src}&dpr=3&webp=1 3x`}
          type="image/webp"
        />
        <source srcSet={`${src}?dpr=1 1x, ${src}&dpr=2 2x, ${src}&dpr=3 3x`} type="image/jpeg" />
        <img src={`${src}?dpr=2`} />
      </Picture>
    </Base>
  )
}

export default Image
