import { withSequence, withSpring } from 'react-native-reanimated'

export function scaleAnimation() {
  return withSequence(
    withSpring(1, { mass: 1, stiffness: 250 }),
    withSpring(1.25, { mass: 1 }),
    withSpring(1, { mass: 1, stiffness: 250 })
  )
}
