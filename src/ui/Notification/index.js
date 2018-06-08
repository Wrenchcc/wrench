import React from 'react'
import PropTypes from 'prop-types'
import { navigateToProfile, navigateToProject } from 'navigation'
import { Avatar, Text } from 'ui'
import { Base, Content } from './styles'

const Notification = ({ data }) => (
  <Base onPress={() => navigateToProject({ id: data.id, user: data.user, project: data.project })}>
    <Avatar
      uri={data.user.avatarUrl}
      size={40}
      onPress={() => navigateToProfile({ user: data.user })}
    />
    <Content>
      <Text onPress={() => navigateToProfile({ user: data.user })}>{data.user.fullName}</Text>
      <Text
        color="light_grey"
        fontSize={15}
        onPress={() => navigateToProject({ id: data.id, user: data.user, project: data.project })}
      >{`Now follows ${data.project.name}`}</Text>
    </Content>
  </Base>
)

Notification.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Notification
