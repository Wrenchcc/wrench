import React, { useRef, useEffect } from 'react'
import { Animated, View } from 'react-native'
import { COLORS } from 'ui/constants'

const DEFAULT_SIZE = 60
const DEFAULT_OPACITY = 1
const DEFAULT_SCALE = 1

function PointOfInterest({ coordinates }) {
  const opacity = useRef(new Animated.Value(DEFAULT_OPACITY))
  const scale = useRef(new Animated.Value(2))

  useEffect(() => {
    scale.current.setValue(2)

    Animated.sequence([
      Animated.parallel(
        [
          Animated.spring(scale.current, {
            toValue: DEFAULT_SCALE,
          }),
          Animated.loop(
            Animated.timing(opacity.current, {
              duration: 300,
              toValue: 0.8,
            }),
            { iterations: 4 }
          ),
        ],
        { useNativeDriver: true }
      ),
      Animated.timing(opacity.current, {
        duration: 400,
        toValue: 0.4,
      }),
    ]).start()
  }, [coordinates])

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        borderColor: COLORS.ORANGE,
        borderWidth: 1,
        height: DEFAULT_SIZE,
        left: coordinates.x - DEFAULT_SIZE / 2,
        opacity: opacity.current,
        position: 'relative',
        top: coordinates.y - DEFAULT_SIZE / 2,
        transform: [{ scale: scale.current }],
        width: DEFAULT_SIZE,
        zIndex: 100,
      }}
    >
      <View
        style={{
          borderColor: COLORS.ORANGE,
          borderTopWidth: 1,
          position: 'absolute',
          top: '50%',
          width: 10,
        }}
      />

      <View
        style={{
          borderColor: COLORS.ORANGE,
          borderTopWidth: 1,
          position: 'absolute',
          right: 0,
          top: '50%',
          width: 10,
        }}
      />

      <View
        style={{
          borderColor: COLORS.ORANGE,
          borderRightWidth: 1,
          bottom: 0,
          height: 10,
          left: '50%',
          position: 'absolute',
        }}
      />

      <View
        style={{
          borderColor: COLORS.ORANGE,
          borderRightWidth: 1,
          height: 10,
          left: '50%',
          position: 'absolute',
          top: 0,
        }}
      />
    </Animated.View>
  )
}

export default PointOfInterest
