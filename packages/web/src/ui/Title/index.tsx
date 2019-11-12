// @ts-nocheck
import React from 'react'
import { Base } from './styles'

const Title = ({ children, style = {}, large, medium, lineHeight, ...props }) => (
  <Base medium={medium} large={large} style={style} lineHeight={lineHeight} {...props}>
    {children}
  </Base>
)

export default Title
