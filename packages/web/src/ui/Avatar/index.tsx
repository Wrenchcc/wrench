// @ts-nocheck
import * as React from 'react'
import Image from '../Image'
import { Base } from './styles'

function Avatar({ uri, size = 30, style = {}, isOnline, className, onPress }) {
  return (
    <Base isOnline={isOnline} onClick={onPress}>
      <Image
        source={uri}
        width={size}
        height={size}
        borderRadius={size}
        className={className}
        absoluteUrl
      />
    </Base>
  )
}

export default Avatar
