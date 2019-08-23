import React, { useCallback } from 'react'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'
import { TouchableOpacity as RNGHTouchableOpacity } from 'react-native-gesture-handler'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import evenHitSlop from 'utils/hitSlop'

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hitSlop = 10,
  onPress,
  nativeHandler,
  hapticFeedback,
  ...props
}) => {
  const Handler = nativeHandler ? RNGHTouchableOpacity : RNTouchableOpacity

  const onPressWrapper = useCallback(() => {
    if (hapticFeedback) {
      ReactNativeHapticFeedback.trigger(hapticFeedback)
    }

    onPress()
  }, [onPress, hapticFeedback])

  return (
    <Handler
      activeOpacity={activeOpacity}
      onPress={onPressWrapper}
      hitSlop={evenHitSlop(hitSlop)}
      {...props}
    >
      {children}
    </Handler>
  )
}

export default Touchable
