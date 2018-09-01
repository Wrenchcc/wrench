import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
import { COLORS } from 'ui/constants'

const ANIMATION_DURATION = 250

export default class Element extends PureComponent {
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
    this.measurement = measurement

    onGestureStart({ element: this, measurement })

    gesturePosition.setValue({ x: 0, y: 0 })

    gesturePosition.setOffset({
      x: measurement.x,
      y: measurement.y,
    })

    Animated.timing(this.opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start()
  }

  onGestureRelease() {
    const { gesturePosition, scaleValue, onGestureRelease } = this.context

    Animated.parallel([
      Animated.spring(gesturePosition.x, {
        bounciness: 3,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(gesturePosition.y, {
        bounciness: 3,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        bounciness: 1,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      gesturePosition.setOffset({
        x: this.measurement.x,
        y: this.measurement.y,
      })

      // Reset original component opacity
      this.opacity.setValue(1)

      // Reset scale value
      scaleValue.setValue(1)

      requestAnimationFrame(() => {
        onGestureRelease()
      })
    })
  }

  onGestureMove = ({ nativeEvent }) => {
    const { gesturePosition } = this.context
    const { translationX, translationY } = nativeEvent

    gesturePosition.setValue({
      x: translationX,
      y: translationY,
    })
  }

  onGesturePinch = ({ nativeEvent }) => {
    const { scaleValue } = this.context
    scaleValue.setValue(nativeEvent.scale)
  }

  setRef = el => {
    this.parent = el
  }

  /* eslint-disable no-underscore-dangle */
  measureSelected = async () => {
    const parentMeasurement = await new Promise((resolve, reject) => {
      try {
        this.parent._component.measureInWindow((x, y) => {
          resolve({ x, y })
        })
      } catch (err) {
        reject(err)
      }
    })

    return {
      x: parentMeasurement.x,
      y: parentMeasurement.y,
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
      >
        <PinchGestureHandler simultaneousHandlers={imagePan} onGestureEvent={this.onGesturePinch}>
          <View style={{ backgroundColor: COLORS.BEIGE }}>
            <Animated.View ref={this.setRef} style={{ opacity: this.opacity }}>
              {this.props.children}
            </Animated.View>
          </View>
        </PinchGestureHandler>
      </PanGestureHandler>
    )
  }
}
