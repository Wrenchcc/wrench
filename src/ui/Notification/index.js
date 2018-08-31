import React from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { navigateToUser, navigateToProject, navigateToComments } from 'navigation'
import { Avatar, Text, TimeAgo } from 'ui'
import { Base, Content, Bottom } from './styles'

const NOTIFICATION_TYPES = {
  COMMENT: 'COMMENT',
  FOLLOW: 'FOLLOW',
  REPLY: 'REPLY',
}

const onPress = data => {
  switch (data.type) {
    case NOTIFICATION_TYPES.FOLLOW:
      return navigateToProject({ id: data.id, user: data.user, project: data.project })
    case NOTIFICATION_TYPES.COMMENT:
    case NOTIFICATION_TYPES.REPLY:
      return navigateToComments({
        id: data.id,
        user: data.user,
        project: data.project,
        highlightedId: data.comment.id,
      })
    default:
      return null
  }
}

const description = (data, t) => {
  switch (data.type) {
    case NOTIFICATION_TYPES.FOLLOW:
      return `${t('.follow')} ${data.project.title}`
    case NOTIFICATION_TYPES.COMMENT:
      return t('.comment')
    case NOTIFICATION_TYPES.REPLY:
      return t('.reply')
    default:
      return null
  }
}

const Notification = ({ data, t }) => (
  <Base onPress={() => onPress(data)}>
    <Avatar
      uri={data.user.avatarUrl}
      size={40}
      onPress={() => navigateToUser({ user: data.user })}
    />
    <Content>
      <Text onPress={() => navigateToUser({ user: data.user })}>{data.user.fullName}</Text>
      <Bottom>
        <Text color="light_grey" fontSize={15} onPress={() => onPress(data)}>
          {description(data, t)}
        </Text>
        <TimeAgo date={data.createdAt} fontSize={15} />
      </Bottom>
    </Content>
  </Base>
)

Notification.propTypes = {
  data: PropTypes.object.isRequired,
}

export default withLocalization(Notification, 'Notification')
