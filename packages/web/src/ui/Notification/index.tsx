// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import TimeAgo from '../TimeAgo'
import { NOTIFICATION_TYPES } from '../../utils/enums'
import Avatar from '../Avatar'
import Text from '../Text'
import { Base, Content, Description, Bottom } from './styles'

function description(data, t) {
  switch (data.type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return `${t('Notification:follow')}: "${data.project.title}"`
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return `${t('Notification:comment')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_REPLY:
      return `${t('Notification:reply')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_MENTION:
      return `${t('Notification:mention')}: "${data.comment.text}"`
    case NOTIFICATION_TYPES.NEW_POST_LIKE:
      return t('Notification:postLike')
    case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
      return t('Notification:commentLike')
    default:
      return null
  }
}

function Notification({ data, first, onPress }) {
  const { t } = useTranslation()

  return (
    <Base first={first}>
      <Link href="/[username]" as={`/${data.user.username}`}>
        <a onClick={onPress}>
          <Avatar uri={data.user.avatarUrl} size={40} isOnline={data.user.isOnline} />
        </a>
      </Link>
      <Content>
        <Link href="/[username]" as={`/${data.user.username}`}>
          <a onClick={onPress}>
            <Text>{data.user.fullName}</Text>
          </a>
        </Link>
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
