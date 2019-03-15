import * as React from 'react'
import Image from '../Image'
import { Base } from './styles'

function Avatar({ uri, size = 30, style = {}, isOnline, className }) {
  const absoluteUrl = `${uri}?type=square&width=${size * 3}&height=${size * 3}`

  return (
    <Base isOnline={isOnline}>
      <Image
        source={uri}
        width={size}
        height={size}
        borderRadius={size}
        className={className}
        absoluteUrl
        absoluteUrl={absoluteUrl}
      />
    </Base>
  )
}

export default Avatar
