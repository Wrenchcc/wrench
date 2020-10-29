// @ts-nocheck
import React from 'react'
import { NotificationIcon } from '@wrench/ui'
import { Icon } from 'ui'
import { Base } from './style'

function Badge({ unread, onPress }) {
  return (
    <Base onClick={onPress} unread={unread}>
      <NotificationIcon />
    </Base>
  )
}

export default Badge
