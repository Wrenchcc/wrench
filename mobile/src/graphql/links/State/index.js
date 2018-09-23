import { withClientState } from 'apollo-link-state'

export default cache => withClientState({
  cache,
  resolvers: {
    Mutation: {},
  },
})
