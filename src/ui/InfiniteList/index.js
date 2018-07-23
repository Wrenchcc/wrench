import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated } from 'react-native'
import { Gateway, Border } from 'ui'
import withKeyboardHandler from 'ui/helpers/withKeyboardHandler'

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)

const InfiniteList = ({
  contentContainerStyle = {},
  paddingHorizontal = 20,
  defaultPaddingTop,
  paddingBottom,
  onScroll,
  scrollRef,
  borderSeparator,
  withComments,
  ...props
}) => (
  <Fragment>
    <AnimatedFlatlist
      style={{ flex: 1 }}
      ref={el => el && scrollRef(el.getNode())}
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
    {withComments && <Gateway.Destination name="mention" />}
  </Fragment>
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
  withComments: PropTypes.bool,
}

export default withKeyboardHandler(InfiniteList)
