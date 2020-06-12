import React from 'react'
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  TouchableOpacity as RNGHTouchableOpacity,
  ContainedTouchableProperties,
} from 'react-native-gesture-handler'
import evenHitSlop from 'utils/hitSlop'

export type TouchableProps = {
  activeOpacity?: number
  children?: React.ReactElement
  hitSlop?: number
  onPress?: () => void
  nativeHandler?: boolean
} & TouchableOpacityProps &
  ContainedTouchableProperties

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hitSlop = 10,
  onPress,
  nativeHandler,
  ...props
}: TouchableProps) => {
  const Handler = nativeHandler ? RNGHTouchableOpacity : RNTouchableOpacity

  return (
    <Handler
      activeOpacity={activeOpacity}
      onPress={onPress}
      hitSlop={evenHitSlop(hitSlop)}
      {...props}
    >
      {children}
    </Handler>
  )
}

export default Touchable
