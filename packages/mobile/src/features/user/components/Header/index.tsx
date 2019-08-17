import React from 'react'
import { Avatar, Title } from 'ui'
import { Base, Username } from './styles'

function Header({ firstName, lastName, avatarUrl = '', spacingHorizontal = false }) {
  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Username>
        <Title medium numberOfLines={0}>
          {firstName}
        </Title>
        <Title medium>{lastName}</Title>
      </Username>
      <Avatar size={80} uri={avatarUrl} />
    </Base>
  )
}

export default Header
