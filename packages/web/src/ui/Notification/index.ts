import React from 'react'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_TYPES } from '../../utils/enums'
import Avatar from '../Avatar'
import Text from '../Text'
// import TimeAgo from 'ui/TimeAgo'
import { COLORS } from '../constants'
import { Base, Content, Bottom } from './styles'

const onPress = data => {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
    // return navigateToProject({ project: data.project })
    case NOTIFICATION_TYPES.NEW_MENTION:
    case NOTIFICATION_TYPES.NEW_COMMENT:
    case NOTIFICATION_TYPES.NEW_REPLY:
    // return navigateToComments({
    //   id: data.comment.postId,
    //   user: data.user,
    //   commentId: data.comment.id,
    // })
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

function Notification({ data }) {
  const { t } = useTranslation()

  return (
    <Base>
      <Avatar uri={data.user.avatarUrl} size={40} isOnline={data.user.isOnline} />
      <Content>
        <Text>{data.user.fullName}</Text>
        <Bottom>
          <div>
            <Text color="light_grey" fontSize={15} lineHeight={22}>
              {description(data, t)}
            </Text>
          </div>
        </Bottom>
      </Content>
    </Base>
  )
}

export default Notification
