// @ts-nocheck
import React from 'react'
import { Base } from './styles'

function Icon({ onPress = () => {}, source, opacity = 1, color, stroke, width, height, ...rest }) {
  return (
    <Base
      onClick={onPress}
      dangerouslySetInnerHTML={{ __html: source }}
      width={width}
      height={height}
      color={color}
      opacity={opacity}
      stroke={stroke}
      {...rest}
    />
  )
}

export default Icon
