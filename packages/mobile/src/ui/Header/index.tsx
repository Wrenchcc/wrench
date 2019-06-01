import React from 'react'
import { Base, Left, Center, Right } from './styles'

function Header({ headerLeft, headerCenter, headerRight, transparent = true }) {
  return (
    <Base transparent={transparent}>
      <Left>{headerLeft}</Left>
      <Center>{headerCenter && headerCenter}</Center>
      <Right>{headerRight || null}</Right>
    </Base>
  )
}

export default Header
