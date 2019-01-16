import React from 'react'
import PropTypes from 'prop-types'
import { BorderlessButton } from 'react-native-gesture-handler'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import evenHitSlop from 'utils/hitSlop'

const onPressWrapper = (onPress, hapticFeedback = false) => {
  if (hapticFeedback) {
    ReactNativeHapticFeedback.trigger(hapticFeedback)
  }

  onPress()
}

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hapticFeedback = false,
  hitSlop = 10,
  onPress,
  ...props
}) => (
  <BorderlessButton
    activeOpacity={activeOpacity}
    onPress={() => onPressWrapper(onPress, hapticFeedback)}
    hitSlop={evenHitSlop(hitSlop)}
    {...props}
  >
    {children}
  </BorderlessButton>
)

Touchable.propTypes = {
  activeOpacity: PropTypes.number,
  children: PropTypes.any,
  hapticFeedback: PropTypes.string,
  hitSlop: PropTypes.number,
  onPress: PropTypes.func,
}

export default Touchable
