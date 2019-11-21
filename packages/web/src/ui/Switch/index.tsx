import React from 'react'
import { COLORS } from 'ui/constants'
import { Base, Blah1, Label, Circle } from './styles'

const Switch = ({ selected, onPress, onColor, name }) => {
  return (
    <Base>
      <Blah1 checked={selected} onChange={onPress} id={name} type="checkbox" />
      <Label
        style={{ background: (selected && onColor) || COLORS.ULTRA_LIGHT_GREY }}
        htmlFor={name}
      >
        <Circle />
      </Label>
    </Base>
  )
}

export default Switch
