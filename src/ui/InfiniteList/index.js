import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated } from 'react-native'
import { Border } from 'ui'
import withKeyboardHandler from 'ui/helpers/withKeyboardHandler'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

// HoC createAnimatedComponent wraps child referene with _component
// In future use getNode() instead of el._component
const InfiniteList = ({
  contentContainerStyle = {},
  paddingHorizontal = 20,
  defaultPaddingTop,
  paddingBottom,
  onScroll,
  scrollRef,
  borderSeparator,
  ...props
}) => (
  <AnimatedFlatlist
    style={{ flex: 1 }}
    ref={el => el && scrollRef(el._component)} // eslint-disable-line
    keyboardShouldPersistTaps="always"
    keyboardDismissMode="on-drag"
    contentContainerStyle={{
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
      paddingTop: (defaultPaddingTop && 50) || 0,
      paddingBottom: (paddingBottom && paddingBottom) || 0,
      ...contentContainerStyle,
    }}
    {...borderSeparator && { ItemSeparatorComponent: () => <Border /> }}
    {...onScroll && { onScroll, scrollEventThrottle: 16 }}
    {...props}
  />
)

InfiniteList.propTypes = {
  borderSeparator: PropTypes.bool,
  onScroll: PropTypes.object,
  scrollRef: PropTypes.func.isRequired,
  defaultPaddingTop: PropTypes.bool,
  paddingBottom: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  fullscreen: PropTypes.bool,
  contentContainerStyle: PropTypes.object,
}

export default withKeyboardHandler(InfiniteList)
