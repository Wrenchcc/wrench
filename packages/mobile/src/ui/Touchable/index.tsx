import React, { useCallback } from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import evenHitSlop from 'utils/hitSlop'

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hapticFeedback = false,
  hitSlop = 10,
  onPress,
  ...props
}) => {
  const handleOnPress = useCallback(() => {
    if (hapticFeedback) {
      ReactNativeHapticFeedback.trigger(hapticFeedback)
    }

    onPress()
  }, [hapticFeedback, onPress])

  return (
    <BaseButton
      activeOpacity={activeOpacity}
      onPress={handleOnPress}
      hitSlop={evenHitSlop(hitSlop)}
      {...props}
    >
      {children}
    </BaseButton>
  )
}

export default Touchable
