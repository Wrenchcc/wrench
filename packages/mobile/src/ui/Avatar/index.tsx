import React, { memo } from 'react'
import { View } from 'react-native'
import { IMAGE_PRIORITY } from 'ui/constants'
import Touchable from 'ui/Touchable'
import Image from 'ui/Image'
import IsOnline from 'ui/IsOnline'

function Avatar({
  uri,
  size = 30,
  onPress = () => null,
  disabled = false,
  isOnline = false,
  badgeSize,
  style = {},
}) {
  return (
    <View style={{ height: size, width: size }}>
      <Touchable onPress={onPress} style={style} disabled={disabled}>
        {isOnline && <IsOnline badgeSize={badgeSize} />}

        <Image
          placeholderDensity={3}
          source={{ uri }}
          width={size}
          height={size}
          borderRadius={size / 2}
          priority={IMAGE_PRIORITY.HIGH}
        />
      </Touchable>
    </View>
  )
}

export default memo(Avatar)
