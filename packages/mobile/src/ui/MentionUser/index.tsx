import React, { useCallback } from 'react'
import Text from 'ui/Text'
import Avatar from 'ui/Avatar'
import { Base, Content } from './styles'

function MentionUser({ user, onPress }) {
  const handleOnPress = useCallback(() => onPress(user), [user])

  return (
    <Base onPress={handleOnPress}>
      <Avatar
        uri={user.avatarUrl}
        size={40}
        fallback={user.isSilhouette}
        fullName={user.fullName}
      />
      <Content>
        <Text>{user.fullName}</Text>
      </Content>
    </Base>
  )
}

export default MentionUser
