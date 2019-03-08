import * as React from 'react'
import Image from '../Image'

function Avatar({ uri, size = 30, style = {}, className }) {
  return (
    <Image
      source={`${uri}?type=square&width=${size * 2}&height=${size * 2}`}
      width={size}
      height={size}
      borderRadius={size / 2}
      className={className}
    />
  )
}

export default Avatar
