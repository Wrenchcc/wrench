import React, { useCallback } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import evenHitSlop from 'utils/hitSlop'

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hapticFeedback = false,
  hitSlop = 10,
  nativeButton = true,
  onPress,
  ...props
}) => {
  const handleOnPress = useCallback(() => {
    if (hapticFeedback) {
      ReactNativeHapticFeedback.trigger(hapticFeedback)
    }

    onPress()
  }, [hapticFeedback, onPress])

  const Button = nativeButton ? BaseButton : TouchableOpacity

  return (
    <Button
      activeOpacity={activeOpacity}
      onPress={handleOnPress}
      hitSlop={evenHitSlop(hitSlop)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Touchable
