// @ts-nocheck
import React, { memo } from 'react'
import {Icon} from 'ui'
import { Base } from './style'

const Badge = memo(function Badge({ unread, onPress }) {
  return (
    <Base onClick={onPress} unread={unread}>
      <Icon source={require('./bell.svg?include')} />
    </Base>
  )
})

export default Badge
