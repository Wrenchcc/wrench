import React, { useRef, useEffect } from 'react'
import { Animated, View } from 'react-native'

function GridLayout({ active }) {
  const animatedValue = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      toValue: active ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [active])

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        opacity: animatedValue.current,
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
            borderColor: 'rgba(000, 000, 000, 0.7)',
          }}
        />
        <View
          style={{
            marginTop: '33.33%',
            width: '100%',
            borderBottomWidth: 1,
            borderColor: 'rgba(000, 000, 000, 0.7)',
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
            borderColor: 'rgba(000, 000, 000, 0.7)',
          }}
        />

        <View
          style={{
            height: '100%',
            position: 'absolute',
            right: '33.33%',
            top: 0,
            borderLeftWidth: 1,
            borderColor: 'rgba(000, 000, 000, 0.7)',
          }}
        />
      </View>
    </Animated.View>
  )
}

export default GridLayout
