import React from 'react'
import { Animated } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler' // 1.0.0-alpha.35

const USE_NATIVE_DRIVER = false // https://github.com/kmagiera/react-native-gesture-handler/issues/71
const MINIMUM_STICKER_SCALE = 0.25
const MAXIMUM_STICKER_SCALE = 2.5

export default class Element extends React.Component {
  constructor(props) {
    super(props)

    // Pinching
    this.pinchScale = new Animated.Value(1)
    this.scale = this.pinchScale.interpolate({
      inputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
      outputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
      extrapolate: 'clamp',
    })

    this.onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: this.pinchScale } }], {
      useNativeDriver: USE_NATIVE_DRIVER,
    })

    // Pan
    this.translateX = new Animated.Value(0)
    this.translateY = new Animated.Value(0)
    this.onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
          },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    )
  }

  onPinchHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      console.log('hej')
      this.pinchScale.setValue(0)
    }
    if (nativeEvent.state === State.END) {
      this.pinchScale.setValue(1)
    }
  }

  onPanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this.translateX.setValue(0)
      this.translateY.setValue(0)
    }
  }

  render() {
    const imagePan = React.createRef()

    return (
      <PanGestureHandler
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanStateChange}
        ref={imagePan}
        minPointers={2}
        maxPointers={2}
        minDist={0}
        minDeltaX={0}
        avgTouches
        shouldCancelWhenOutside
      >
        <PinchGestureHandler
          simultaneousHandlers={imagePan}
          onGestureEvent={this.onPinchGestureEvent}
          onHandlerStateChange={this.onPinchHandlerStateChange}
        >
          <Animated.View
            style={{
              transform: [
                { scale: this.scale },
                { translateX: this.translateX },
                { translateY: this.translateY },
              ],
            }}
          >
            {this.props.children}
          </Animated.View>
        </PinchGestureHandler>
      </PanGestureHandler>
    )
  }
}
