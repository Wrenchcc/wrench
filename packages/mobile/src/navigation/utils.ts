export const keyExtractor = ({ node }) => node.id

export function getNode(ref) {
  if (ref.current === null) {
    return null
  }

  if (ref.current.getScrollResponder) {
    return ref.current.getScrollResponder()
  } else if (ref.current.getNode) {
    return ref.current.getNode()
  } else {
    return ref.current
  }
}
