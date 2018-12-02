import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { navigateToUser, navigateToProject, navigateToComments } from 'navigation'
import { Avatar, Text, TimeAgo } from 'ui'
import { Base, Content, Bottom } from './styles'

const NOTIFICATION_TYPES = {
  COMMENT: 'comment',
  FOLLOW: 'follow',
  REPLY: 'reply',
}

const onPress = data => {
  switch (data.type) {
    case NOTIFICATION_TYPES.FOLLOW:
      return navigateToProject({ project: data.project })
    case NOTIFICATION_TYPES.COMMENT:
    case NOTIFICATION_TYPES.REPLY:
      return navigateToComments({
        id: data.comment.postId,
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
      return `${t('Notification:follow')} ${data.project.title}`
    case NOTIFICATION_TYPES.COMMENT:
      return t('Notification:comment')
    case NOTIFICATION_TYPES.REPLY:
      return t('Notification:reply')
    default:
      return null
  }
}

function Notification({ data, t }) {
  return (
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
}

Notification.propTypes = {
  data: PropTypes.object.isRequired,
}

export default withNamespaces('Notification')(Notification)
