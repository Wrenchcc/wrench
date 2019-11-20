import React from 'react'
import { Blah1, Label, Button } from './styles'

const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <>
      <Blah1 checked={isOn} onChange={handleToggle} id="react-switch-new" type="checkbox" />
      <Label style={{ background: isOn && onColor }} htmlFor="react-switch-new">
        <Button />
      </Label>
    </>
  )
}

export default Switch
