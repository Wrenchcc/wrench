import { encodeCursor } from './cursor'

export default (nodes, { column }) => nodes.map(node => ({
  cursor: encodeCursor(node.id, node[column]),
  node,
}))
