import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Text } from 'ui'
import { Base, Content } from './styles'

const MentionUser = ({ user, onPress }) => (
  <Base onPress={() => onPress(user)}>
    <Avatar uri={user.avatarUrl} size={40} />
    <Content>
      <Text>{user.fullName}</Text>
    </Content>
  </Base>
)

MentionUser.propTypes = {
  user: PropTypes.object.isRequired,
}

export default MentionUser
