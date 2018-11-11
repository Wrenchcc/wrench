import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
import { COLORS } from 'ui/constants'

const ANIMATION_DURATION = 250

export default class Element extends PureComponent {
  opacity = new Animated.Value(1)

  panRef = React.createRef()

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  static contextTypes = {
    scaleValue: PropTypes.object,
    onGestureStart: PropTypes.func,
    onGestureRelease: PropTypes.func,
    gesturePosition: PropTypes.object,
    gestureOffset: PropTypes.object,
  }

  onPanGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      return this.onGestureRelease()
    }
    return this.onGestureStart()
  }

  onGestureStart = async () => {
    const { onGestureStart, gesturePosition, gestureOffset } = this.context

    const measurement = await this.measureSelected()
    this.measurement = measurement

    onGestureStart({ element: this, measurement })

    gesturePosition.setValue({ x: 0, y: 0 })
    gestureOffset.setValue({ x: measurement.x, y: measurement.y })

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
      // Reset original component opacity
      this.opacity.setValue(1)

      // Reset scale value
      scaleValue.setValue(1)

      requestAnimationFrame(() => {
        onGestureRelease()
      })
    })
  }

  onPanGestureEvent = ({ nativeEvent }) => {
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
    return (
      <PanGestureHandler
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanGestureStateChange}
        ref={this.panRef}
        minPointers={2}
        maxPointers={2}
        minDist={0}
        minDeltaX={0}
        avgTouches
      >
        <PinchGestureHandler
          simultaneousHandlers={this.panRef}
          onGestureEvent={this.onGesturePinch}
        >
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
