import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Title, Avatar } from 'ui'
import { Base, Username } from './styles'

const Header = memo(({ user: { firstName, lastName, avatarUrl } }) => (
  <Base>
    <Username>
      <Title medium>{firstName}</Title>
      <Title medium>{lastName}</Title>
    </Username>
    <Avatar size={80} uri={avatarUrl} />
  </Base>
))

Header.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Header
