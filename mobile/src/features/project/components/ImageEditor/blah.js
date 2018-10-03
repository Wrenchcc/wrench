import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler'

import staticImage from './cat.jpg'

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  wrapper: {
    flex: 1,
  },
}

export default class ImageEditor extends Component {
  panRef = React.createRef()

  rotationRef = React.createRef()

  pinchRef = React.createRef()

  constructor(props) {
    super(props)

    /* Pinching */
    this.baseScale = new Animated.Value(1)
    this.pinchScale = new Animated.Value(1)
    this.scale = Animated.multiply(this.baseScale, this.pinchScale)
    this.lastScale = 1
    this.onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: this.pinchScale } }], {
      useNativeDriver: true,
    })

    /* Rotation */
    this.rotate = new Animated.Value(0)
    this.rotateStr = this.rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    })
    this.lastRotate = 0
    this.onRotateGestureEvent = Animated.event([{ nativeEvent: { rotation: this.rotate } }], {
      useNativeDriver: true,
    })

    /* Tilt */
    this.tilt = new Animated.Value(0)
    this.tiltStr = this.tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ['1rad', '1rad', '0rad', '0rad'],
    })
    this.lastTilt = 0
    this.onTiltGestureEvent = Animated.event([{ nativeEvent: { translationY: this.tilt } }], {
      useNativeDriver: true,
    })
  }

  onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastRotate += event.nativeEvent.rotation
      this.rotate.setOffset(this.lastRotate)
      this.rotate.setValue(0)
    }
  }

  onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }
  }

  onTiltGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastTilt += event.nativeEvent.translationY
      this.tilt.setOffset(this.lastTilt)
      this.tilt.setValue(0)
    }
  }

  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this.onTiltGestureEvent}
        onHandlerStateChange={this.onTiltGestureStateChange}
        minDist={10}
        minPointers={2}
        maxPointers={2}
        avgTouches
      >
        <Animated.View style={styles.wrapper}>
          <RotationGestureHandler
            ref={this.rotationRef}
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this.onRotateGestureEvent}
            onHandlerStateChange={this.onRotateHandlerStateChange}
          >
            <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this.onPinchGestureEvent}
                onHandlerStateChange={this.onPinchHandlerStateChange}
              >
                <Animated.View style={styles.container} collapsable={false}>
                  <Animated.Image
                    style={[
                      styles.pinchableImage,
                      {
                        transform: [
                          { perspective: 200 },
                          { scale: this.scale },
                          { rotate: this.rotateStr },
                          { rotateX: this.tiltStr },
                        ],
                      },
                    ]}
                    source={staticImage}
                  />
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
