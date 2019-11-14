// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from '../TimeAgo'
import { NOTIFICATION_TYPES } from '../../utils/enums'
import Avatar from '../Avatar'
import Text from '../Text'
import { Base, Content, Description, Bottom } from './styles'

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

function Notification({ data, first }) {
  const { t } = useTranslation()

  return (
    <Base first={first}>
      <div>
        <Avatar uri={data.user.avatarUrl} size={40} isOnline={data.user.isOnline} />
      </div>
      <Content>
        <Text>{data.user.fullName}</Text>
        <Bottom>
          <Description color="grey" fontSize={15} lineHeight={22}>
            {description(data, t)}
          </Description>
          <TimeAgo date={data.createdAt} fontSize={15} />
        </Bottom>
      </Content>
    </Base>
  )
}

export default Notification
