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
              toValue: 0.8,
              duration: 300,
            }),
            { iterations: 4 }
          ),
        ],
        { useNativeDriver: true }
      ),
      Animated.timing(opacity.current, {
        toValue: 0.4,
        duration: 400,
      }),
    ]).start()
  }, [coordinates])

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        opacity: opacity.current,
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
        borderWidth: 1,
        borderColor: COLORS.ORANGE,
        position: 'relative',
        zIndex: 100,
        top: coordinates.y - DEFAULT_SIZE / 2,
        left: coordinates.x - DEFAULT_SIZE / 2,
        transform: [{ scale: scale.current }],
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: 10,
          borderTopWidth: 1,
          borderColor: COLORS.ORANGE,
          top: '50%',
        }}
      />

      <View
        style={{
          position: 'absolute',
          width: 10,
          borderTopWidth: 1,
          borderColor: COLORS.ORANGE,
          top: '50%',
          right: 0,
        }}
      />

      <View
        style={{
          position: 'absolute',
          height: 10,
          borderRightWidth: 1,
          borderColor: COLORS.ORANGE,
          bottom: 0,
          left: '50%',
        }}
      />

      <View
        style={{
          position: 'absolute',
          height: 10,
          borderRightWidth: 1,
          borderColor: COLORS.ORANGE,
          top: 0,
          left: '50%',
        }}
      />
    </Animated.View>
  )
}

export default PointOfInterest
