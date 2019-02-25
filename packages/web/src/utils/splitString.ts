export default function splitString(s) {
  const parts = []
  let middle = Math.floor(s.length / 2)
  const before = s.lastIndexOf(' ', middle)
  const after = s.indexOf(' ', middle + 1)

  if (middle - before < after - middle) {
    middle = before
  } else {
    middle = after
  }

  parts.push(s.substr(0, middle))
  parts.push(s.substr(middle + 1))

  return parts
}
