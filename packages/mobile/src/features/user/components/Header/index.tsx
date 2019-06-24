import React from 'react'
import { Title, Avatar } from 'ui'
import { Base, Username } from './styles'

function Header({ user: { firstName, lastName, avatarUrl = '' }, spacingHorizontal = false }) {
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
