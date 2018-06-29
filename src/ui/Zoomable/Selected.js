import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'

const styles = {
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
}

const MINIMUM_SCALE = 1
const MAXIMUM_SCALE = 5
const SCALE_MULTIPLIER = 1.2

export default class Selected extends PureComponent {
  static propTypes = {
    selected: PropTypes.object,
  }

  static contextTypes = {
    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object,
  }

  render() {
    const { selected } = this.props
    const { gesturePosition, scaleValue } = this.context

    const scale = scaleValue.interpolate({
      inputRange: [MINIMUM_SCALE, MAXIMUM_SCALE],
      outputRange: [MINIMUM_SCALE, MAXIMUM_SCALE * SCALE_MULTIPLIER],
      extrapolate: 'clamp',
    })

    const backgroundOpacityValue = scaleValue.interpolate({
      inputRange: [1.2, 3],
      outputRange: [0, 0.6],
    })

    // TODO: Disable fade in on child
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, { opacity: backgroundOpacityValue }]} />
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 10,
            transform: [...gesturePosition.getTranslateTransform(), { scale }],
          }}
        >
          {selected.element.props.children}
        </Animated.View>
      </View>
    )
  }
}
