import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'

const gridColor = 'black'

export default class Grid extends React.PureComponent {
  render() {
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          height: '100%',
          position: 'absolute',
          width: '100%',
        }}
      >
        <View
          style={{
            backgroundColor: gridColor,
            height: '100%',
            left: '33%',
            position: 'absolute',
            width: 0.5,
          }}
        />
        <View
          style={{
            backgroundColor: gridColor,
            height: '100%',
            position: 'absolute',
            right: '33%',
            width: 0.5,
          }}
        />
        <View
          style={{
            backgroundColor: gridColor,
            height: 0.5,
            position: 'absolute',
            top: '33%',
            width: '100%',
          }}
        />
        <View
          style={{
            backgroundColor: gridColor,
            bottom: '33%',
            height: 0.5,
            position: 'absolute',
            width: '100%',
          }}
        />
      </Animated.View>
    )
  }
}
