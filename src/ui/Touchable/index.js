import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import hitSlop from 'utils/hitSlop'

const onPressWrapper = (onPress, hapticFeedback = false) => {
  if (hapticFeedback) {
    ReactNativeHapticFeedback.trigger(hapticFeedback, true)
  }

  onPress()
}

const Touchable = ({ children, onPress, hapticFeedback = false, ...props }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onPressWrapper(onPress, hapticFeedback)}
    hitSlop={hitSlop(10)}
    {...props}
  >
    {children}
  </TouchableOpacity>
)

Touchable.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  hapticFeedback: PropTypes.string,
}

export default Touchable
