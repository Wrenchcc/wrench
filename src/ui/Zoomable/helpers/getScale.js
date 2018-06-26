const SCALE_MULTIPLIER = 1.2

export default function getScale(currentDistance, initialDistance) {
  return (currentDistance / initialDistance) * SCALE_MULTIPLIER
}
