// @ts-nocheck
import React from 'react'
import { Base } from './styles'

function Button({ onPress, children, className, black }) {
  return (
    <Base onClick={onPress} className={className} black={black}>
      {children}
    </Base>
  )
}

export default Button
