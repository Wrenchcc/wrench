import React from 'react';
import Animated from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { useAnimatedProps } from 'react-native-reanimated';

const gridColor = '#000';

function Grid({ opacity }) {
  const gridOpacityStyle = useAnimatedProps(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
        },
        gridOpacityStyle,
      ]}
    >
      <View
        style={{
          width: StyleSheet.hairlineWidth,
          height: '100%',
          position: 'absolute',
          left: '33%',
          backgroundColor: gridColor,
        }}
      />
      <View
        style={{
          width: StyleSheet.hairlineWidth,
          height: '100%',
          position: 'absolute',
          right: '33%',
          backgroundColor: gridColor,
        }}
      />
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          width: '100%',
          position: 'absolute',
          top: '33%',
          backgroundColor: gridColor,
        }}
      />
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          width: '100%',
          position: 'absolute',
          bottom: '33%',
          backgroundColor: gridColor,
        }}
      />
    </Animated.View>
  );
}

export default Grid;
