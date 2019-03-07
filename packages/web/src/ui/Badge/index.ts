import React, { memo } from 'react'
import { Icon, Base } from './style'

const Badge = memo(function Badge({ unread, onPress }) {
  return (
    <Base onClick={onPress}>
      <Icon src={require('./bell.svg')} unread={unread} />
    </Base>
  )
})

export default Badge
