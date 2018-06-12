import React from 'react'
import PropTypes from 'prop-types'
import { Title, Avatar } from 'ui'
import { Base, Username } from './styles'

const Header = ({ user, spacingHorizontal = false }) => (
  <Base spacingHorizontal={spacingHorizontal}>
    <Username>
      <Title medium>{user.firstName}</Title>
      <Title medium>{user.lastName}</Title>
    </Username>
    <Avatar size={80} uri={user.avatarUrl} />
  </Base>
)

Header.propTypes = {
  spacingHorizontal: PropTypes.bool,
  user: PropTypes.object.isRequired,
}

export default Header
