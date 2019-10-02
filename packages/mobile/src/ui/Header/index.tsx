import React from 'react'
import { Background, Base, Left, Center, Right } from './styles'

function Header({ headerLeft, headerTitle, headerRight, color }) {
  return (
    <Background color={color}>
      <Base color={color}>
        <Left>{headerLeft}</Left>
        <Center>{headerTitle}</Center>
        <Right>{headerRight}</Right>
      </Base>
    </Background>
  )
}

export default Header
