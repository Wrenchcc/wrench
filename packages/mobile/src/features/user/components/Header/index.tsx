import React from 'react'
import { Avatar } from 'ui'
import { Base, Username } from './styles'

function Header({ fullName, avatarUrl = '', spacingHorizontal = false }) {
  return (
    <Base spacingHorizontal={spacingHorizontal}>
      <Username medium numberOfLines={0}>
        {fullName}
      </Username>
      <Avatar size={80} uri={avatarUrl} />
    </Base>
  )
}

export default Header
