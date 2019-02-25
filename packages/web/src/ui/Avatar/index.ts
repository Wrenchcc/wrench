import * as React from 'react'
import Image from '../Image'

function Avatar({ uri, size = 30, style = {}, className }) {
  return (
    <Image source={uri} width={size} height={size} borderRadius={size / 2} className={className} />
  )
}

export default Avatar
