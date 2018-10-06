import React, { PureComponent } from 'react'
import { Animated, View } from 'react-native'

export default class GridLayout extends PureComponent {
  animatedValue = new Animated.Value(0)

  componentWillReceiveProps(nextProps) {
    this.handleAnimation(!nextProps.active)
  }

  handleAnimation(hide) {
    Animated.timing(this.animatedValue, {
      toValue: hide ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          opacity: this.animatedValue,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '33.33%',
          }}
        >
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: 'rgba(000, 000, 000, 0.9)',
            }}
          />
          <View
            style={{
              marginTop: '33.33%',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: 'rgba(000, 000, 000, 0.9)',
            }}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <View
            style={{
              height: '100%',
              position: 'absolute',
              left: '33.33%',
              top: 0,
              borderLeftWidth: 1,
              borderColor: 'rgba(000, 000, 000, 0.9)',
            }}
          />

          <View
            style={{
              height: '100%',
              position: 'absolute',
              right: '33.33%',
              top: 0,
              borderLeftWidth: 1,
              borderColor: 'rgba(000, 000, 000, 0.9)',
            }}
          />
        </View>
      </Animated.View>
    )
  }
}
