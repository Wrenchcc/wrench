import Animated from 'react-native-reanimated'

const { interpolate } = Animated

export function transformContainer(translateY, headerHeight) {
  return {
    transform: [
      {
        translateY: interpolate(translateY, {
          inputRange: [-headerHeight, 0],
          outputRange: [-headerHeight, 0],
        }),
      },
    ],
  }
}

export function opacityContent(translateY, headerHeight) {
  return {
    opacity: interpolate(translateY, {
      inputRange: [-headerHeight, 0],
      outputRange: [0, 1],
    }),
  }
}
