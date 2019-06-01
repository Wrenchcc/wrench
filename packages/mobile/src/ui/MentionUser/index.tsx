import React from 'react'
import Text from 'ui/Text'
import Avatar from 'ui/Avatar'
import { Base, Content } from './styles'

function MentionUser({ user, onPress }) {
  return (
    <Base onPress={() => onPress(user)}>
      <Avatar uri={user.avatarUrl} size={40} />
      <Content>
        <Text>{user.fullName}</Text>
      </Content>
    </Base>
  )
}

export default MentionUser
