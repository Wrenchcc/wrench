import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Text from 'ui/Text'
import Avatar from 'ui/Avatar'
import { Base, Content } from './styles'

const MentionUser = memo(({ user, onPress }) => (
    <Base onPress={() => onPress(user)}>
      <Avatar uri={user.avatarUrl} size={40} />
      <Content>
        <Text>{user.fullName}</Text>
      </Content>
    </Base>
))

MentionUser.propTypes = {
  user: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default MentionUser
