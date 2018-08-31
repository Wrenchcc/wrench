import React from 'react'
import PropTypes from 'prop-types'
import { Title, Avatar } from 'ui'
import { Base, Username } from './styles'

const Header = ({ user: { firstName, lastName, avatarUrl = '' }, spacingHorizontal = false }) => (
  <Base spacingHorizontal={spacingHorizontal}>
    <Username>
      <Title medium>{firstName}</Title>
      <Title medium>{lastName}</Title>
    </Username>
    <Avatar size={80} uri={avatarUrl} />
  </Base>
)

Header.propTypes = {
  spacingHorizontal: PropTypes.bool,
  user: PropTypes.object.isRequired,
}

export default Header
