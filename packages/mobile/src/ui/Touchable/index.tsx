import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import evenHitSlop from 'utils/hitSlop'

export type PressablePropsType = {
  children?: React.ReactNode
  hitSlop?: number
  android_disableSound?: boolean
  onPress?: () => void
} & PressableProps

const Touchable = ({
  children,
  hitSlop = 10,
  onPress,
  android_disableSound = true,
  ...props
}: PressablePropsType) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={evenHitSlop(hitSlop)}
      android_disableSound={android_disableSound}
      {...props}
    >
      {children}
    </Pressable>
  )
}

export default Touchable
