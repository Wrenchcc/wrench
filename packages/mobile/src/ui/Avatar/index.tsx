import React, { memo } from 'react'
import { View } from 'react-native'
import { IMAGE_PRIORITY } from 'ui/constants'
import Touchable from 'ui/Touchable'
import Image from 'ui/Image'
import IsOnline from 'ui/IsOnline'
import Text from 'ui/Text'
import { COLORS } from '../constants'

const getInitials = (string: string) => {
  if (string.length <= 2) {
    return string.toUpperCase()
  }

  const names = string.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initials
}

type AvatarProps = {
  uri: string
  size?: number
  onPress?: () => void
  disabled?: boolean
  isOnline?: boolean
  badgeSize?: string
  style?: Record<string, any>
  borderWidth?: number
  borderColor?: string
  fullName: string
  fallback?: boolean
}

function Avatar({
  uri,
  size = 30,
  onPress = () => null,
  disabled = false,
  isOnline = false,
  badgeSize,
  style = {},
  borderWidth = 0,
  borderColor,
  fullName,
  fallback,
}: AvatarProps) {
  return (
    <View
      style={{
        height: size,
        width: size,
      }}
    >
      <Touchable onPress={onPress} style={style} disabled={disabled}>
        {isOnline && <IsOnline badgeSize={badgeSize} />}

        {fallback ? (
          <View
            style={{
              width: size,
              height: size,
              backgroundColor: COLORS.LIGHT_GREY,
              borderRadius: size,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text fontSize={size / 3} medium color="white">
              {getInitials(fullName)}
            </Text>
          </View>
        ) : (
          <Image
            borderWidth={borderWidth}
            borderColor={borderColor}
            placeholderDensity={3}
            source={{ uri }}
            width={size}
            height={size}
            borderRadius={size / 2}
            priority={IMAGE_PRIORITY.HIGH}
          />
        )}
      </Touchable>
    </View>
  )
}

export default memo(Avatar)
