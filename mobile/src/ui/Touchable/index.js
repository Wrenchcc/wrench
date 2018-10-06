import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import hitSlop from 'utils/hitSlop'

const onPressWrapper = (onPress, hapticFeedback = false) => {
  if (hapticFeedback) {
    ReactNativeHapticFeedback.trigger(hapticFeedback)
  }

  onPress()
}

const Touchable = ({
  children,
  onPress,
  activeOpacity = 0.8,
  hapticFeedback = false,
  ...props
}) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    onPress={() => onPressWrapper(onPress, hapticFeedback)}
    hitSlop={hitSlop(10)}
    {...props}
  >
    {children}
  </TouchableOpacity>
)

Touchable.propTypes = {
  activeOpacity: PropTypes.number,
  children: PropTypes.any,
  hapticFeedback: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}

export default Touchable
