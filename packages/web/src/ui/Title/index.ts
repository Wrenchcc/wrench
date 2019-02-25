import React from 'react'
// import Touchable from 'ui/Touchable'
import { Base } from './styles'

const Title = ({ children, style = {}, large, medium, ...props }) => (
  <Base medium={medium} large={large} style={style} {...props}>
    {children}
  </Base>
)

export default Title
