import * as React from 'react'
import Image from '../Image'
import { Base } from './styles'

function Avatar({ uri, size = 30, style = {}, isOnline, className }) {
  return (
    <Base isOnline={isOnline}>
      <Image
        source={`${uri}?type=square&width=${size * 2}&height=${size * 2}`}
        width={size}
        height={size}
        borderRadius={size}
        className={className}
      />
    </Base>
  )
}

export default Avatar
