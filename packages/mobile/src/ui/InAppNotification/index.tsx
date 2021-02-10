import React from 'react'
import { Text, Avatar } from 'ui'
import { Base, Content } from './styles'

interface InAppNotificationProps {
  title: string
  body: string
  avatarUrl: string
}

const InAppNotification = ({ body, title, avatarUrl }: InAppNotificationProps) => {
  return (
    <Base>
      <Avatar size={40} uri={avatarUrl} style={{ flex: 1 }} />

      <Content>
        <Text fontSize={15} bold>
          {title}
        </Text>
        <Text fontSize={15} numberOfLines={2}>
          {body}
        </Text>
      </Content>
    </Base>
  )
}

export default InAppNotification
