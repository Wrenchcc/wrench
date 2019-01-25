import postsConnection from './postsConnection'

export default {
  Feed: {
    postsConnection,
  },
  Query: {
    // Root type does not return anything yet
    feed: () => ({}),
  },
}
