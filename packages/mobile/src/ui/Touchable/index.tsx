import React from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import evenHitSlop from 'utils/hitSlop'

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hitSlop = 10,
  nativeButton = true,
  onPress,
  ...props
}) => {
  const Button = nativeButton ? BaseButton : TouchableOpacity

  return (
    <Button
      activeOpacity={activeOpacity}
      onPress={onPress}
      hitSlop={evenHitSlop(hitSlop)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Touchable
