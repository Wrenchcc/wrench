import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'

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

  onPanStateChange = async ({ nativeEvent }) => {
    const { scaleValue, onGestureStart, onGestureRelease, gesturePosition } = this.context

    if (nativeEvent.state === State.BEGAN) {
      const measurement = await this.measureSelected()

      onGestureStart({
        element: this,
        measurement,
      })

      gesturePosition.setOffset({
        x: measurement.x,
        y: measurement.y,
      })

      gesturePosition.setValue({
        x: 0,
        y: 0,
      })

      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 200,
      }).start()
    }

    if (nativeEvent.state === State.END) {
      scaleValue.setValue(1)
      this.opacity.setValue(1)
      onGestureRelease()
    }
  }

  onGestureMove = ({ nativeEvent }) => {
    // const { gesturePosition } = this.context
    // const { translationX, translationY } = nativeEvent
    // gesturePosition.x.setValue(translationX)
    // gesturePosition.y.setValue(translationY)
  }

  setScale = ({ nativeEvent }) => {
    const { scaleValue } = this.context
    scaleValue.setValue(nativeEvent.scale)
  }

  setRef = el => {
    this.parent = el
  }

  measureSelected = async () => {
    /* eslint-disable no-underscore-dangle */
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
      /* eslint-enable no-underscore-dangle */
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
