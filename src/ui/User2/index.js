import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Text } from 'ui'
import { Base, Content } from './styles'

// TODO: Make a more generic user component with left|right
const User = ({ user, onPress }) => (
  <Base onPress={() => onPress(user)}>
    <Avatar uri={user.avatarUrl} size={40} />
    <Content>
      <Text>{user.fullName}</Text>
    </Content>
  </Base>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User
