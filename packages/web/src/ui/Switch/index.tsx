// @ts-nocheck
import React from 'react'
import { Base, Check, Label, Circle } from './styles'

const Switch = ({ selected, onPress, name }) => {
  return (
    <Base>
      <Check checked={selected} onChange={onPress} id={name} type="checkbox" />
      <Label selected={selected} htmlFor={name}>
        <Circle />
      </Label>
    </Base>
  )
}

export default Switch
