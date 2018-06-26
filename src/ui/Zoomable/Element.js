import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, PanResponder, ViewPropTypes } from 'react-native'

import getDistance from './helpers/getDistance'
import getScale from './helpers/getScale'

const RESTORE_ANIMATION_DURATION = 200

const styles = {
  container: {
    flex: 1,
  },
}

export default class Element extends PureComponent {
  initialTouches = []

  gestureHandler = {}

  opacity = new Animated.Value(1)

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
    style: ViewPropTypes.style,
  }

  static contextTypes = {
    isDragging: PropTypes.bool,
    onGestureStart: PropTypes.func,
    onGestureRelease: PropTypes.func,
    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object,
  }

  constructor() {
    super()
    this.generatePanHandlers()
  }

  onGestureMove = (evt, gestureState) => {
    const { touches } = evt.nativeEvent

    if (!this.gestureInProgress) {
      return
    }
    if (touches.length < 2) {
      // Trigger a realease
      this.onGestureRelease(evt, gestureState)
      return
    }

    // for moving photo around
    const { gesturePosition, scaleValue } = this.context
    const { dx, dy } = gestureState

    gesturePosition.x.setValue(dx)
    gesturePosition.y.setValue(dy)

    // for scaling photo
    const currentDistance = getDistance(touches)
    const initialDistance = getDistance(this.initialTouches)
    const newScale = getScale(currentDistance, initialDistance)
    scaleValue.setValue(newScale)
  }

  onGestureRelease = (evt, gestureState) => {
    if (this.gestureInProgress !== gestureState.stateID) {
      return
    }

    this.gestureInProgress = null
    this.initialTouches = []

    const { gesturePosition, scaleValue, onGestureRelease } = this.context

    // set to initial position and scale
    Animated.parallel([
      Animated.timing(gesturePosition.x, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(gesturePosition.y, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      gesturePosition.setOffset({
        x: 0,
        y: (this.selectedMeasurement && this.selectedMeasurement.y) || 0,
      })

      this.opacity.setValue(1)

      requestAnimationFrame(() => {
        onGestureRelease()
      })
    })
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

  startGesture = async (evt, gestureState) => {
    // Sometimes gesture start happens two or more times rapidly.
    if (this.gestureInProgress) {
      return
    }

    this.gestureInProgress = gestureState.stateID
    const { gesturePosition, onGestureStart } = this.context
    const { touches } = evt.nativeEvent

    this.initialTouches = touches

    const selectedMeasurement = await this.measureSelected()
    this.selectedMeasurement = selectedMeasurement
    onGestureStart({
      element: this,
      measurement: selectedMeasurement,
    })

    gesturePosition.setValue({
      x: 0,
      y: 0,
    })

    gesturePosition.setOffset({
      x: 0,
      y: selectedMeasurement.y,
    })

    Animated.timing(this.opacity, {
      toValue: 0,
      duration: 200,
    }).start()
  }

  generatePanHandlers() {
    const handler = evt => typeof this.context.isDragging !== 'undefined' && evt.nativeEvent.touches.length === 2
    this.gestureHandler = PanResponder.create({
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: handler,
      onMoveShouldSetPanResponderCapture: handler,
      onPanResponderGrant: this.startGesture,
      onPanResponderMove: this.onGestureMove,
      onPanResponderRelease: this.onGestureRelease,
      onPanResponderTerminationRequest: () => this.gestureInProgress == null,
      onPanResponderTerminate: this.onGestureRelease,
    })
  }

  render() {
    const { children } = this.props

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.opacity,
          },
        ]}
        ref={this.setRef}
        {...this.gestureHandler.panHandlers}
      >
        {children}
      </Animated.View>
    )
  }
}
