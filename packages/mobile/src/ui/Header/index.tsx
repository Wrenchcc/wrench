import React from 'react'
import { Background, Base, Left, Center, Right } from './styles'

function Header({ headerLeft, headerTitle, headerRight, color, top }) {
  return (
    <Background color={color}>
      <Base color={color} top={top}>
        <Left>{headerLeft}</Left>
        <Center>{headerTitle}</Center>
        <Right>{headerRight}</Right>
      </Base>
    </Background>
  )
}

export default Header
