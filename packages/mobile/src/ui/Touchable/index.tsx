import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import evenHitSlop from 'utils/hitSlop'

export type PressablePropsType = {
  children?: React.ReactNode
  hitSlop?: number
  android_disableSound?: boolean
  onPress?: () => void
} & TouchableOpacityProps

// Pressable does not work on Android devmode
const Touchable = ({
  children,
  hitSlop = 10,
  onPress,
  android_disableSound = true,
  ...props
}: PressablePropsType) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={evenHitSlop(hitSlop)} activeOpacity={1} {...props}>
      {children}
    </TouchableOpacity>
  )
}

export default Touchable
