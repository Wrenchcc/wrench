import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

export default class ImageEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.lastOffset = { x: 0, y: 0 }

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
      { useNativeDriver: true }
    )
  }

  onPanGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += nativeEvent.translationX
      this.lastOffset.y += nativeEvent.translationY
      this.translateX.setOffset(this.lastOffset.x)
      this.translateX.setValue(0)
      this.translateY.setOffset(this.lastOffset.y)
      this.translateY.setValue(0)
      console.log('this.lastOffset.x', this.lastOffset.x)
      console.log('this.lastOffset.y', this.lastOffset.y)

      if (this.lastOffset.x > 0) {
        this.translateX.setOffset(0)
        Animated.spring(this.translateX, {
          velocity: nativeEvent.velocityX,
          tension: 10,
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }

      if (this.lastOffset.x < -225) {
        this.translateX.setOffset(-225)
        Animated.spring(this.translateX, {
          velocity: nativeEvent.velocityX,
          tension: 10,
          toValue: -225,
          useNativeDriver: true,
        }).start()
      }

      // if (this.lastOffset.y > 0) {
      //   this.translateY.setOffset(0)
      //   Animated.spring(this.translateY, {
      //     velocity: nativeEvent.velocityY,
      //     tension: 10,
      //     toValue: 0,
      //     useNativeDriver: true,
      //   }).start()
      // }
    }
  }

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanGestureStateChange}
        minPointers={1}
        maxPointers={2}
        minDist={0}
        minDeltaX={0}
        avgTouches
      >
        <Animated.Image
          style={[
            {
              flex: 1,
              transform: [{ translateX: this.translateX }, { translateY: this.translateY }],
            },
          ]}
          source={require('./cat.jpg')}
        />
      </PanGestureHandler>
    )
  }
}
