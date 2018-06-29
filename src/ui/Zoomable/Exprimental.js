import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'

const ANIMATION_DURATION = 200

export default class Element extends React.Component {
  opacity = new Animated.Value(1)

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  static contextTypes = {
    scaleValue: PropTypes.object,
    onGestureStart: PropTypes.func,
    onGestureRelease: PropTypes.func,
    gesturePosition: PropTypes.object,
  }

  onPanStateChange = ({ nativeEvent }) => {
    switch (nativeEvent.state) {
      case State.BEGAN:
        return this.onGestureStart()
      case State.END:
        return this.onGestureRelease()
      default:
        return null
    }
  }

  onGestureStart = async () => {
    const { onGestureStart, gesturePosition } = this.context

    const measurement = await this.measureSelected()
    // this.measurement = measurement

    onGestureStart({
      element: this,
      measurement,
    })

    gesturePosition.setOffset({
      x: measurement.x,
      y: measurement.y,
    })

    // gesturePosition.setValue({
    //   x: 0,
    //   y: 0,
    // })

    Animated.timing(this.opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start()
  }

  onGestureRelease() {
    const { gesturePosition, scaleValue, onGestureRelease } = this.context
    // Animated.parallel([
    //   Animated.timing(gesturePosition.x, {
    //     toValue: 0,
    //     duration: ANIMATION_DURATION,
    //     easing: Easing.ease,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(gesturePosition.y, {
    //     toValue: 0,
    //     duration: ANIMATION_DURATION,
    //     easing: Easing.ease,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(scaleValue, {
    //     toValue: 1,
    //     duration: ANIMATION_DURATION,
    //     easing: Easing.ease,
    //     useNativeDriver: true,
    //   }),
    // ]).start(() => {
    //   gesturePosition.setOffset({
    //     x: this.measurement.x,
    //     y: this.measurement.y,
    //   })
    //   scaleValue.setValue(1)
    //   this.opacity.setValue(1)
    //   requestAnimationFrame(() => {
    //     onGestureRelease()
    //   })
    // })

    scaleValue.setValue(1)
    this.opacity.setValue(1)
    onGestureRelease()
  }

  onGestureMove = ({ nativeEvent }) => {
    const { gesturePosition } = this.context
    const { translationX, translationY } = nativeEvent
    gesturePosition.x.setValue(translationX)
    gesturePosition.y.setValue(translationY)
  }

  setScale = ({ nativeEvent }) => {
    const { scaleValue } = this.context
    scaleValue.setValue(nativeEvent.scale)
  }

  setRef = el => {
    this.parent = el
  }

  // https://facebook.github.io/react-native/docs/direct-manipulation.html#measurelayoutrelativetonativenode-onsuccess-onfail
  /* eslint-disable no-underscore-dangle */
  measureSelected = async () => {
    const parentMeasurement = await new Promise((resolve, reject) => {
      try {
        this.parent._component.measureInWindow((winX, winY, winWidth, winHeight) => {
          resolve({
            x: winX,
            y: winY,
            w: winWidth,
            h: winHeight,
          })
        })
      } catch (e) {
        reject(e)
      }
    })

    return {
      x: parentMeasurement.x,
      y: parentMeasurement.y,
      w: parentMeasurement.w,
      h: parentMeasurement.h,
    }
  }

  render() {
    const imagePan = React.createRef()

    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureMove}
        onHandlerStateChange={this.onPanStateChange}
        ref={imagePan}
        minPointers={2}
        maxPointers={2}
        minDist={0}
        minDeltaX={0}
        avgTouches
      >
        <PinchGestureHandler simultaneousHandlers={imagePan} onGestureEvent={this.setScale}>
          <Animated.View ref={this.setRef} style={{ opacity: this.opacity }}>
            {this.props.children}
          </Animated.View>
        </PinchGestureHandler>
      </PanGestureHandler>
    )
  }
}
