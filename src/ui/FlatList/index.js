import React from 'react'
import PropTypes from 'prop-types'
import { FlatList as RNFlatList } from 'react-native'
import { Border } from 'ui'

// No withKeyboardHandler and not Animated
const FlatList = ({
  contentContainerStyle = {},
  paddingHorizontal = 20,
  defaultPaddingTop,
  paddingBottom,
  onScroll,
  scrollRef,
  borderSeparator,
  ...props
}) => (
  <RNFlatList
    style={{ flex: 1 }}
    ref={el => el && scrollRef && scrollRef(el.getNode())}
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

FlatList.propTypes = {
  borderSeparator: PropTypes.bool,
  onScroll: PropTypes.object,
  scrollRef: PropTypes.func,
  defaultPaddingTop: PropTypes.bool,
  paddingBottom: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  fullscreen: PropTypes.bool,
  contentContainerStyle: PropTypes.object,
}

export default FlatList
