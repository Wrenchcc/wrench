import React, { memo } from 'react'
import { Icon, Base } from './style'

const Badge = memo(function Badge({ count, onPress }) {
  return (
    <Base onClick={onPress}>
      <Icon src={require('./bell.svg')} count={count} />
    </Base>
  )
})

export default Badge
