import { withClientState } from 'apollo-link-state'

export default cache => withClientState({
  cache,
  resolvers: {
    Mutation: {
      updatePostingProgress: (_, { data }, { cache }) => {
        cache.writeData({
          data: {
            postingProgress: {
              __typename: 'PostingProgress',
              data,
            },
          },
        })
        return null
      },
    },
  },
  defaults: {
    postingProgress: {
      __typename: 'PostingProgress',
      data: null,
    },
  },
})
