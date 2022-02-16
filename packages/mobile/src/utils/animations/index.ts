import { withSequence, withSpring } from 'react-native-reanimated'

export function scaleAnimation() {
  return withSequence(
    withSpring(1, { mass: 1, stiffness: 250 }),
    withSpring(1.25, { mass: 1 }),
    withSpring(1, { mass: 1, stiffness: 250 })
  )
}

export const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet'
  return Math.min(Math.max(lowerBound, value), upperBound)
}

export const snapPoint = (
  value: number,
  velocity: number,
  points: ReadonlyArray<number>
): number => {
  'worklet'
  const point = value + 0.2 * velocity
  const deltas = points.map((p) => Math.abs(point - p))
  const minDelta = Math.min.apply(null, deltas)
  return points.filter((p) => Math.abs(point - p) === minDelta)[0]
}
