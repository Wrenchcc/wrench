import React from 'react'
import { Base, Left, Center, Right } from './styles'

function Header({ headerLeft, headerTitle, headerRight, color }) {
  return (
    <Base color={color}>
      <Left>{headerLeft}</Left>
      <Center>{headerTitle}</Center>
      <Right>{headerRight}</Right>
    </Base>
  )
}

export default Header
