import React, { useRef, useEffect } from 'react'
import { Animated, View } from 'react-native'

function Grid({ active }) {
  const animatedValue = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      duration: 200,
      toValue: active ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }, [active])

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        height: '100%',
        left: 0,
        opacity: animatedValue.current,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <View
        style={{
          height: '100%',
          position: 'absolute',
          top: '33.33%',
          width: '100%',
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'rgba(000, 000, 000, 0.7)',
            width: '100%',
          }}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'rgba(000, 000, 000, 0.7)',
            marginTop: '33.33%',
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <View
          style={{
            borderColor: 'rgba(000, 000, 000, 0.7)',
            borderLeftWidth: 1,
            height: '100%',
            left: '33.33%',
            position: 'absolute',
            top: 0,
          }}
        />

        <View
          style={{
            borderColor: 'rgba(000, 000, 000, 0.7)',
            borderLeftWidth: 1,
            height: '100%',
            position: 'absolute',
            right: '33.33%',
            top: 0,
          }}
        />
      </View>
    </Animated.View>
  )
}

export default Grid
