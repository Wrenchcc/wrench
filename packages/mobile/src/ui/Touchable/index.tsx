import React from 'react'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'
import { TouchableOpacity as RNGHTouchableOpacity } from 'react-native-gesture-handler'
import evenHitSlop from 'utils/hitSlop'

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hitSlop = 10,
  onPress,
  nativeHandler,
  ...props
}) => {
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
