import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import evenHitSlop from 'utils/hitSlop'

const Touchable = ({ activeOpacity = 0.8, children, hitSlop = 10, onPress, ...props }) => {
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
