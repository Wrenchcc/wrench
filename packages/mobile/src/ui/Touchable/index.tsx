import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import evenHitSlop from 'utils/hitSlop'

export type TouchableProps = {
  activeOpacity?: number
  children?: React.ReactNode
  hitSlop?: number
  onPress?: () => void
} & TouchableOpacityProps

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hitSlop = 10,
  onPress,
  ...props
}: TouchableProps) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      hitSlop={evenHitSlop(hitSlop)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Touchable
