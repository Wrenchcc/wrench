import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import Selected from './Selected'

export default class Provider extends PureComponent {
  scaleValue = new Animated.Value(1)

  gesturePosition = new Animated.ValueXY()

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
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
    this.setState({ isDragging: false })
  }

  renderSelectedElement = () => {
    const { isDragging, selected } = this.state

    if (isDragging) {
      return <Selected selected={selected} />
    }

    return null
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
        {this.renderSelectedElement()}
      </Fragment>
    )
  }
}
