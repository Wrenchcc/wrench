// @ts-nocheck
import React from 'react'
import NextImage from 'ui/NextImage'
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
  // const src = `${source}?w=${width}&h=${height}?dpr=3`
  // const placeholder = `${source}?w=${Math.round(width / placeholderDensity)}&h=${Math.round(
  //   height / placeholderDensity
  // )}&dpr=1`

  return (
    <Base
      w={width}
      h={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      {...props}
    >
      <NextImage src={source} width={width} height={height} quality={100} lazy />
    </Base>
  )
}

export default Image
