import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'

const MINIMUM_SCALE = 1
const MAXIMUM_SCALE = 5
const SCALE_MULTIPLIER = 1.2
const ANIMATION_DURATION = 200

export default class Element extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props)

    // Pinching
    this.pinchScale = new Animated.Value(1)
    this.scale = this.pinchScale.interpolate({
      inputRange: [MINIMUM_SCALE, MAXIMUM_SCALE],
      outputRange: [MINIMUM_SCALE, MAXIMUM_SCALE * SCALE_MULTIPLIER],
      extrapolate: 'clamp',
    })

    this.onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: this.pinchScale } }])

    // Pan
    this.translateX = new Animated.Value(0)
    this.translateY = new Animated.Value(0)
    this.onPanGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY,
        },
      },
    ])
  }

  onPanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state !== State.ACTIVE) {
      Animated.parallel([
        Animated.timing(this.translateX, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(this.pinchScale, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start()
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
      >
        <PinchGestureHandler
          simultaneousHandlers={imagePan}
          onGestureEvent={this.onPinchGestureEvent}
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
