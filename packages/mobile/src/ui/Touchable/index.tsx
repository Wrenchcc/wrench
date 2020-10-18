import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import evenHitSlop from 'utils/hitSlop'

export type PressablePropsType = {
  children?: React.ReactNode
  hitSlop?: number
  onPress?: () => void
} & PressableProps

const Touchable = ({ children, hitSlop = 10, onPress, ...props }: PressablePropsType) => {
  return (
    <Pressable onPress={onPress} hitSlop={evenHitSlop(hitSlop)} {...props}>
      {children}
    </Pressable>
  )
}

export default Touchable
