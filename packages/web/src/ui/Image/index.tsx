// @ts-nocheck
import React from 'react'
import NextImage from 'ui/NextImage'
import { Base, Picture } from './styles'

function Image({ width, height, borderRadius, placeholderColor, style, source, ...props }) {
  return (
    <Base
      w={width}
      h={height}
      borderRadius={borderRadius}
      placeholderColor={placeholderColor}
      {...props}
    >
      <NextImage src={source} width={width} height={height} quality={100} lazy="true" />
    </Base>
  )
}

export default Image
