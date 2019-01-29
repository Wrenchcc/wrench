import { filter } from 'ramda'

export default ({ type, id }) => prev => {
  const edges = filter(edge => edge.node.id !== id, prev[type].posts.edges)

  return {
    ...prev,
    [type]: {
      ...prev[type],
      posts: {
        ...prev[type].posts,
        edges,
      },
    },
  }
}
