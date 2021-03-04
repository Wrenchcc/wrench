import React, { useMemo } from 'react'
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'
import Animated, { interpolateColors } from 'react-native-reanimated'

const Background = ({ animatedIndex, style }: BottomSheetBackgroundProps) => {
  // animated variables
  // const animatedBackground = useMemo(
  //   () =>
  //     interpolateColors(animatedIndex, {
  //       inputRange: [0, 1],
  //       outputColorRange: ['#fff', '#a8b5eb'],
  //     }),
  //   [animatedIndex]
  // )

  // styles
  // const containerStyle = useMemo(
  //   () => [
  //     style,
  //     {
  //       backgroundColor: animatedBackground,
  //     },
  //   ],
  //   [style, animatedBackground]
  // )

  return <Animated.View />
}

export default Background
