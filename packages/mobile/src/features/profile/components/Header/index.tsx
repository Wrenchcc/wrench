import React from 'react'
import { Title, Avatar } from 'ui'
import { Base, Username } from './styles'

type Props = {
  spacingHorizontal: bool
  user: object
}

function Header({
  user: { firstName, lastName, avatarUrl = '' },
  spacingHorizontal = false,
}: Props) {
  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Username>
        <Title medium>{firstName}</Title>
        <Title medium>{lastName}</Title>
      </Username>
      <Avatar size={80} uri={avatarUrl} />
    </Base>
  )
}

export default Header
