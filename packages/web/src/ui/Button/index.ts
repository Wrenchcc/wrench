import React from 'react'
import { Base } from './styles'

function Button({ onPress, children, className }) {
  return (
    <Base onClick={onPress} className={className}>
      {children}
    </Base>
  )
}

export default Button
