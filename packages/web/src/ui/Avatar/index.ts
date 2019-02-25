import * as React from 'react'
import Image from '../Image'

function Avatar({
  uri,
  size = 30,
  onPress,
  disabled = false,
  isOnline = false,
  badgeSize,
  style = {},
}) {
  return <Image source={uri} width={size} height={size} borderRadius={size / 2} />
}

export default Avatar
