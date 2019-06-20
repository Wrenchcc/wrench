import React from 'react'
import { Base, Left, Center, Right } from './styles'

function Header({ headerLeft, headerCenter, headerRight, color }) {
  return (
    <Base color={color}>
      <Left>{headerLeft}</Left>
      <Center>{headerCenter && headerCenter}</Center>
      <Right>{headerRight || null}</Right>
    </Base>
  )
}

export default Header
