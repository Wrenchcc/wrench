import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'

export default class ImageEditor extends PureComponent {
  panRef = React.createRef()

  pinchRef = React.createRef()

  constructor(props) {
    super(props)

    // Pinching
    this.baseScale = new Animated.Value(1)
    this.pinchScale = new Animated.Value(1)
    this.scale = Animated.multiply(this.baseScale, this.pinchScale)
    this.lastScale = 1
    this.onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: this.pinchScale } }], {
      useNativeDriver: true,
    })
  }

  onPinchHandlerStateChange = evt => {
    if (evt.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= evt.nativeEvent.scale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }
  }

  onPanGestureStateChange = () => {}

  onPanGestureStateChange = () => {}

  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanGestureStateChange}
        minPointers={2}
        maxPointers={2}
        minDist={0}
        minDeltaX={0}
        avgTouches
      >
        <PinchGestureHandler
          simultaneousHandlers={this.panRef}
          onGestureEvent={this.onPinchGestureEvent}
          onHandlerStateChange={this.onPinchHandlerStateChange}
        >
          <Animated.View style={{ flex: 1 }} collapsable={false}>
            <Animated.Image
              style={[
                { flex: 1 },
                {
                  transform: [{ scale: this.scale }],
                },
              ]}
              source={require('./cat.jpg')}
            />
          </Animated.View>
        </PinchGestureHandler>
      </PanGestureHandler>
    )
  }
}
