import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import Selected from './Selected'

const styles = {
  container: {
    flex: 1,
  },
}

export default class ZoomableProvider extends PureComponent {
  scaleValue = new Animated.Value(1)

  gesturePosition = new Animated.ValueXY()

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
    renderBackground: PropTypes.func,
  }

  static childContextTypes = {
    isDragging: PropTypes.bool,
    onGestureStart: PropTypes.func,
    onGestureRelease: PropTypes.func,
    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object,
  }

  state = {
    isDragging: false,
  }

  getChildContext() {
    const { isDragging } = this.state

    return {
      isDragging,
      onGestureStart: this.onGestureStart,
      onGestureRelease: this.onGestureRelease,

      gesturePosition: this.gesturePosition,
      scaleValue: this.scaleValue,
    }
  }

  onGestureStart = selected => {
    this.setState({
      selected,
      isDragging: true,
    })
  }

  onGestureRelease = () => {
    this.setState({
      isDragging: false,
    })
  }

  renderSelectedElement = () => {
    const { renderBackground } = this.props
    const { isDragging, selected } = this.state

    if (isDragging) {
      return <Selected selected={selected} renderBackground={renderBackground} />
    }
    return null
  }

  render() {
    const { children } = this.props

    return (
      <View style={styles.container}>
        {children}
        {this.renderSelectedElement()}
      </View>
    )
  }
}
