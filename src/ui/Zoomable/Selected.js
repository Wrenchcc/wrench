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

export default class Selected extends PureComponent {
  static propTypes = {
    selected: PropTypes.object,
    renderBackground: PropTypes.func,
  }

  static contextTypes = {
    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object,
  }

  renderBackground = (selected, scaleValue) => {
    const backgroundOpacityValue = scaleValue.interpolate({
      inputRange: [1.2, 3],
      outputRange: [0, 0.6],
    })

    return <Animated.View style={[styles.background, { opacity: backgroundOpacityValue }]} />
  }

  render() {
    const { selected, renderBackground = this.renderBackground } = this.props
    const { gesturePosition, scaleValue } = this.context
    const animatedStyle = {
      transform: gesturePosition.getTranslateTransform(),
    }
    animatedStyle.transform.push({
      scale: scaleValue,
    })

    const elementStyle = [
      {
        position: 'absolute',
        zIndex: 10,
        width: selected.measurement.w,
        height: selected.measurement.h,
      },
      animatedStyle,
    ]

    return (
      <View style={styles.container}>
        {renderBackground(selected, scaleValue, gesturePosition)}
        <Animated.View style={elementStyle}>{selected.element.props.children}</Animated.View>
      </View>
    )
  }
}
