import { DOT_SIZE, DOT_SPACE } from './styles'

export default (slides, currentIndex) => {
  const t = slides.length
  const c = currentIndex
  const v = 4
  let offset = 0

  if (c < v / 2 || t <= v) {
    return offset
  } else if (c > t - v / 2) {
    offset = t - v
  } else {
    offset = c - Math.floor(v / 2)
  }

  return -(offset * (DOT_SIZE + DOT_SPACE))
}
