import React from 'react'
import PropTypes from 'prop-types'
import { Animated, FlatList } from 'react-native'
import withKeyboardHandler from 'ui/helpers/withKeyboardHandler'

const EnhancedFlatlist = Animated.createAnimatedComponent(FlatList)

// HoC createAnimatedComponent wraps child referene with _component
// In future use getNode() instead of el._component
const AnimatedFlatlist = ({ contentContainerStyle = {}, paddingHorizontal = 20, ...props }) => (
  <EnhancedFlatlist
    style={{ flex: 1 }}
    ref={el => el && props.scrollRef(el._component)} // eslint-disable-line
    keyboardShouldPersistTaps="always"
    keyboardDismissMode="on-drag"
    contentContainerStyle={{
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
      paddingTop: (props.defaultPaddingTop && 50) || 0,
      ...contentContainerStyle,
    }}
    scrollEventThrottle={16}
    {...props}
  />
)

AnimatedFlatlist.propTypes = {
  defaultPaddingTop: PropTypes.bool,
  paddingHorizontal: PropTypes.number,
  fullscreen: PropTypes.bool,
  scrollRef: PropTypes.func.isRequired,
  contentContainerStyle: PropTypes.object,
}

export default withKeyboardHandler(AnimatedFlatlist)
