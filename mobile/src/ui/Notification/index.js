import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { navigateToUser, navigateToProject, navigateToComments } from 'navigation'
import { Avatar, Text, TimeAgo } from 'ui'
import { NOTIFICATION_TYPES } from 'utils/enums'
import { Base, Content, Bottom } from './styles'

const onPress = data => {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return navigateToProject({ project: data.project })
    case NOTIFICATION_TYPES.NEW_MENTION:
    case NOTIFICATION_TYPES.NEW_COMMENT:
    case NOTIFICATION_TYPES.NEW_REPLY:
      return navigateToComments({
        id: data.comment.postId,
        user: data.user,
        commentId: data.comment.id,
      })
    default:
      return null
  }
}

const description = (data, t) => {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return `${t('Notification:follow')}: "${data.project.title}"`
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return `${t('Notification:comment')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_REPLY:
      return `${t('Notification:reply')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_MENTION:
      return `${t('Notification:mention')}: "${data.comment.text}"`
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
          <View style={{ marginRight: 50 }}>
            <Text color="light_grey" fontSize={15} lineHeight={22} onPress={() => onPress(data)}>
              {description(data, t)}
            </Text>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            <TimeAgo date={data.createdAt} fontSize={15} />
          </View>
        </Bottom>
      </Content>
    </Base>
  )
}

Notification.propTypes = {
  data: PropTypes.object.isRequired,
}

export default withNamespaces('Notification')(Notification)
