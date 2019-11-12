import React, { memo } from 'react'
import { Icon, Base } from './style'

const Badge = memo(function Badge({ unread, onPress }) {
  return (
    <Base onClick={onPress} unread={unread}>
      <Icon src={require('./bell.svg')} />
    </Base>
  )
})

export default Badge
