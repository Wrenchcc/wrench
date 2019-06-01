import React from 'react'
import { View } from 'react-native'
import { IMAGE_PRIORITY } from 'ui/constants'
import Touchable from 'ui/Touchable'
import Image from 'ui/Image'
import IsOnline from 'ui/IsOnline'

function Avatar({
  uri,
  size = 30,
  onPress,
  disabled = false,
  isOnline = false,
  badgeSize,
  style = {},
}) {
  if (onPress) {
    return (
      <View style={{ position: 'relative', height: size, width: size }}>
        <Touchable onPress={onPress} style={style} disabled={disabled}>
          <Image
            placeholderDensity={3}
            source={{ uri }}
            width={size}
            height={size}
            borderRadius={size / 2}
            priority={IMAGE_PRIORITY.HIGH}
          />
          {isOnline && <IsOnline badgeSize={badgeSize} />}
        </Touchable>
      </View>
    )
  }

  return (
    <View style={{ position: 'relative' }}>
      <Image
        placeholderDensity={3}
        source={{ uri }}
        width={size}
        height={size}
        style={style}
        borderRadius={size / 2}
        priority={IMAGE_PRIORITY.HIGH}
      />
      {isOnline && <IsOnline badgeSize={badgeSize} />}
    </View>
  )
}

export default Avatar
