import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import evenHitSlop from 'utils/hitSlop'

const onPressWrapper = (onPress, hapticFeedback = false) => {
  onPress()

  if (hapticFeedback) {
    ReactNativeHapticFeedback.trigger(hapticFeedback)
  }
}

const Touchable = ({
  activeOpacity = 0.8,
  children,
  hapticFeedback = false,
  hitSlop = 10,
  onPress,
  ...props
}) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    onPress={() => onPressWrapper(onPress, hapticFeedback)}
    hitSlop={evenHitSlop(hitSlop)}
    {...props}
  >
    {children}
  </TouchableOpacity>
)

Touchable.propTypes = {
  activeOpacity: PropTypes.number,
  children: PropTypes.any,
  hapticFeedback: PropTypes.string,
  hitSlop: PropTypes.number,
  onPress: PropTypes.func,
}

export default Touchable
